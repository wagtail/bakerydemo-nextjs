import { cache } from 'react';
import type { z } from 'zod';
import {
  type ContentType,
  getSchema,
  type Schema,
  type wagtailcore,
} from '@/models';
import wagtailimages from '@/models/wagtailimages';

const apiHost = process.env.NEXT_PUBLIC_WAGTAIL_API_HOST!;
const apiToken = process.env.WAGTAIL_API_TOKEN;

interface PageResponse<T> {
  count: number;
  items: T[];
}

async function apiFetch<T>(
  endpoint: string,
  { auth = false }: { auth?: boolean } = {},
): Promise<T> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (auth && apiToken) {
    headers.Authorization = `Bearer ${apiToken}`;
  }

  const response = await fetch(`${apiHost}${endpoint}`, { headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `API Error: ${response.status} ${response.statusText}${
        errorData.message ? ` - ${errorData.message}` : ''
      }`,
    );
  }

  return response.json();
}

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Fetch a single image's raw JSON by ID, in place of the thin `{id, meta}`
 * stubs that v3 nests inside pages/snippets.
 */
const getImageRaw = cache(async (id: number) => {
  return apiFetch<JsonValue>(`/api/v3-preview/images/${id}/`);
});

/**
 * Fetch a single page's raw JSON by ID, in place of the thin `{id, meta}`
 * FK stubs v3 nests inside pages (e.g. HomePage.hero_cta_link). Only the
 * base page fields (id/title/meta) are used by callers, but the raw
 * response is returned as-is (not trimmed) since it's spliced back into a
 * tree that gets parsed once, as a whole, by the caller.
 */
const getPageRaw = cache(async (id: number) => {
  return apiFetch<JsonValue>(`/api/v3-preview/pages/${id}/`);
});

/**
 * Fetch a single snippet's raw JSON by its content type and ID, in place of
 * the thin `{id, meta}` FK stubs v3 nests inside pages. Unlike pages/images,
 * v3's snippets endpoint requires authentication (no anonymous access), so
 * this sends WAGTAIL_API_TOKEN as a bearer token. Returns null if the
 * snippet can't be resolved (e.g. draft/deleted, or a model with no
 * snippet API endpoint such as breads.Country), matching how v2's expanded
 * fields used to silently omit unresolvable relations.
 */
const getSnippetRaw = cache(async (contentType: string, id: number) => {
  try {
    return await apiFetch<JsonValue>(
      `/api/v3-preview/snippets/${contentType}/${id}/`,
      { auth: true },
    );
  } catch {
    return null;
  }
});

function isForeignKeyStub(
  value: JsonValue,
): value is { id: number | null; meta: { type: string } } {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const keys = Object.keys(value).sort();
  if (keys.join(',') !== 'id,meta') return false;
  const meta = value.meta;
  return (
    typeof meta === 'object' &&
    meta !== null &&
    !Array.isArray(meta) &&
    typeof meta.type === 'string'
  );
}

/**
 * Recursively replaces thin `{id, meta: {type}}` foreign key stubs (as
 * returned by v3 for images and snippet/page relations nested inside a
 * page) with the fully hydrated raw JSON, since v3 has no fields/expand
 * mechanism to do this server-side. The whole tree is parsed exactly once
 * by the caller afterwards, so every resolver here returns raw JSON rather
 * than a parsed object. Page/parent references in `meta` (which carry a
 * `title` alongside `id`/`meta`) are left untouched, as are bare id lists
 * (e.g. BreadPage.ingredients).
 */
async function hydrateForeignKeys(value: JsonValue): Promise<JsonValue> {
  if (Array.isArray(value)) {
    return Promise.all(value.map(hydrateForeignKeys));
  }

  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (isForeignKeyStub(value)) {
    if (value.id == null) return value;

    // v3 reports the generic `wagtailcore.Page` type for page FK fields
    // (e.g. HomePage.hero_cta_link) regardless of the linked page's actual
    // type. Any FK field resolved via a page fetch - whether reported as
    // `wagtailcore.Page` or as a fallback below - is NEVER recursed into
    // further: callers only need id/title/meta.html_path from a linked
    // page, not its own images/relations, and recursing would re-hydrate
    // that page's own relations (e.g. a BlogPage's
    // blog_person_relationship.page pointing right back at it), causing
    // unbounded/circular fan-out across the site graph.
    if (value.meta.type === 'wagtailcore.Page') {
      return (await getPageRaw(value.id).catch(() => null)) ?? value;
    }

    if (value.meta.type === 'wagtailimages.Image') {
      const image = await getImageRaw(value.id).catch(() => null);
      return image ? hydrateForeignKeys(image) : value;
    }

    // Everything else is tried as a snippet (small, leaf-like - safe to
    // recurse into). If it's not a real snippet (e.g. breads.Country,
    // wagtailcore.Collection - no snippet API endpoint exists for these),
    // leave the stub as-is. Do NOT fall back to a page fetch here: the
    // numeric id belongs to whatever model `meta.type` names, not to the
    // pages table, so treating it as a page id would silently splice in
    // an unrelated page.
    const snippet = await getSnippetRaw(value.meta.type, value.id);
    return snippet ? hydrateForeignKeys(snippet) : value;
  }

  const entries = await Promise.all(
    Object.entries(value).map(async ([key, val]) => [
      key,
      await hydrateForeignKeys(val),
    ]),
  );
  return Object.fromEntries(entries);
}

/**
 * Get a single page by path or ID, resolved to its specific content type.
 */
async function getPage<CT extends ContentType = 'wagtailcore.Page'>(
  id: number,
): Promise<z.output<Schema<CT>>>;
async function getPage<CT extends ContentType = 'wagtailcore.Page'>(
  path: string,
): Promise<z.output<Schema<CT>>>;
async function getPage<CT extends ContentType = 'wagtailcore.Page'>(
  pathOrId: string | number,
): Promise<z.output<Schema<CT>>> {
  const raw =
    typeof pathOrId === 'number'
      ? await apiFetch<JsonValue>(`/api/v3-preview/pages/${pathOrId}/`)
      : await apiFetch<JsonValue>(
          `/api/v3-preview/pages/find/?html_path=${encodeURIComponent(pathOrId)}`,
        );
  const data = await hydrateForeignKeys(raw);
  const schema = getSchema<CT>((data as wagtailcore.Page).meta.type as CT);
  return schema.parse(data) as z.output<Schema<CT>>;
}

/**
 * Find a page by path, returning its raw (un-hydrated) JSON alongside the
 * resolved content type string from `meta.type`. Used to look up the
 * specific page type without a redundant second fetch, since v3's
 * find/detail endpoints already return the full page data in one call -
 * only the content-type-specific `.parse()` needs to happen a second time
 * (via `parsePage`).
 */
async function findPage(
  path: string,
): Promise<{ raw: JsonValue; type: string }> {
  const raw = await apiFetch<JsonValue>(
    `/api/v3-preview/pages/find/?html_path=${encodeURIComponent(path)}`,
  );
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new Error('Unexpected response shape from pages/find/');
  }
  const meta = raw.meta;
  if (typeof meta !== 'object' || meta === null || Array.isArray(meta)) {
    throw new Error('Unexpected response shape from pages/find/');
  }
  return { raw, type: meta.type as string };
}

/**
 * Parse the raw JSON from `findPage`/`getPage` against a specific content
 * type's schema, hydrating any foreign key stubs first.
 */
async function parsePage<CT extends ContentType>(
  raw: JsonValue,
  contentType: CT,
): Promise<z.output<Schema<CT>>> {
  const schema = getSchema(contentType);
  const data = await hydrateForeignKeys(raw);
  return schema.parse(data) as z.output<Schema<CT>>;
}

/**
 * Get pages of a specific type. The v3 list endpoint only returns
 * {meta, id, title} per item, so each item is hydrated with a follow-up
 * detail fetch.
 */
async function getPages<CT extends ContentType>(
  contentType: CT,
  params: Record<string, string> = {},
) {
  const schema = getSchema(contentType);
  const searchParams = new URLSearchParams({ ...params, type: contentType });

  const data = await apiFetch<PageResponse<{ id: number }>>(
    `/api/v3-preview/pages/?${searchParams}`,
  );

  const items = await Promise.all(
    data.items.map(async (item) => {
      const raw = await apiFetch<JsonValue>(
        `/api/v3-preview/pages/${item.id}/`,
      );
      const detail = await hydrateForeignKeys(raw);
      return schema.parse(detail) as z.output<Schema<CT>>;
    }),
  );

  return { ...data, items };
}

async function getPreview<CT extends ContentType>(
  contentType: CT,
  token: string,
): Promise<z.output<Schema<CT>>> {
  const schema = getSchema(contentType);
  const raw = await apiFetch<JsonValue>(
    `/api/v3-preview/preview/?content_type=${contentType}&token=${token}`,
  );
  const data = await hydrateForeignKeys(raw);
  return schema.parse(data) as z.output<Schema<CT>>;
}

/**
 * Get images
 */
async function getImages(params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams(params);
  const data = await apiFetch<PageResponse<unknown>>(
    `/api/v3-preview/images/?${searchParams}`,
  );

  return {
    ...data,
    items: data.items.map((item) => wagtailimages.Image.parse(item)),
  };
}

const api = {
  getPage: cache(getPage),
  findPage: cache(findPage),
  parsePage: cache(parsePage),
  getPages: cache(getPages),
  getPreview: cache(getPreview),
  getImages: cache(getImages),
};

export default api;
