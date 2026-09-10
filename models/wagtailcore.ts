import { z } from 'zod';
import {
  BasePageMetaSchema,
  PageSchema as GeneratedPageSchema,
  SimpleBasePageMetaSchema,
  SimpleBasePageSchema,
} from '@/lib/generated/schemas';

// Utility function to remove origin from URL
const removeOrigin = (url: string): string => {
  return url.replace(/^(?:https?:\/\/[^/]+)?/, '');
};

// Base meta fields schema for all models (snippets etc.)
const baseMetaSchema = BasePageMetaSchema.pick({
  type: true,
  detail_url: true,
});

// A lightweight reference to another page (subset of fields), with
// html_path derived from html_url. Used both for `meta.parent`/`alias_of`,
// and for page FK fields elsewhere (e.g. HomePage.hero_cta_link) once
// lib/api.ts has hydrated their `{id, meta}` stub to a full page fetch -
// only this reduced shape is picked out of that larger response.
export const pageLinkSchema = SimpleBasePageSchema.extend({
  meta: SimpleBasePageMetaSchema.transform(
    (data): typeof data & { html_path: string } => {
      const typed = data as { html_url?: string | null };
      return {
        ...data,
        html_path: removeOrigin(typed.html_url ?? ''),
      };
    },
  ),
});

const pageLinksShape = {
  parent: pageLinkSchema.nullable().optional(),
  alias_of: pageLinkSchema.nullable().optional(),
};

/**
 * Adds a derived `html_path` field (origin-stripped `html_url`) to a page
 * meta schema, and gives its `parent`/`alias_of` fields (present on every
 * generated page meta schema, always typed as a plain `SimpleBasePageSchema`
 * with no `html_path`) the same `pageLinkSchema` treatment. Used by every
 * page content type, as `meta.html_path` is read throughout the app for
 * internal links, including via `meta.parent`/`meta.alias_of`.
 *
 * The cast inside the transform sidesteps a zod v4 type-inference issue
 * where `.extend()`'s computed return type, when built from a generic
 * `Shape` parameter, doesn't resolve field types (e.g. `html_url`)
 * concretely enough for the following `.transform()` to see them. The
 * runtime behaviour (spread + derive html_path) is straightforward; only
 * the static type needed help.
 */
type ShapeOutput<Shape extends z.ZodRawShape> = {
  [K in keyof Shape as undefined extends z.output<Shape[K]>
    ? never
    : K]: z.output<Shape[K]>;
} & {
  [K in keyof Shape as undefined extends z.output<Shape[K]>
    ? K
    : never]?: z.output<Shape[K]>;
};

export function withHtmlPath<
  Shape extends z.ZodRawShape & {
    html_url: z.ZodType<string | null | undefined>;
  },
>(metaSchema: z.ZodObject<Shape>) {
  return metaSchema.extend(pageLinksShape).transform(
    (
      data,
    ): ShapeOutput<Shape> & {
      parent?: z.output<typeof pageLinkSchema> | null;
      alias_of?: z.output<typeof pageLinkSchema> | null;
      html_path: string;
    } => {
      const typed = data as unknown as ShapeOutput<Shape>;
      const htmlUrl = (data as { html_url?: string | null }).html_url;
      return {
        ...typed,
        html_path: removeOrigin(htmlUrl ?? ''),
      };
    },
  );
}

// Full page schema, with html_path derived from html_url. `meta.type` is
// widened from the generated `z.literal("wagtailcore.Page")` to `z.string()`
// - every specific page type (base.StandardPage, blog.BlogPage, etc.) must
// structurally satisfy this base Page type for PageComponentProps<T> to
// work, which the literal blocks.
const pageSchema = GeneratedPageSchema.extend({
  meta: withHtmlPath(
    GeneratedPageSchema.shape.meta.extend({ type: z.string() }),
  ),
  id: z.number(),
});

// Export schemas
const schemas = {
  Page: pageSchema,
  _BaseMeta: baseMetaSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace wagtailcore {
  export type Page = z.infer<typeof schemas.Page>;
  export type _BaseMeta = z.infer<typeof schemas._BaseMeta>;
}
