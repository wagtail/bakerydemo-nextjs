import { type ContentType, type Schema, getSchema } from '@/models';
import { z } from 'zod';

// Helper to get field names from a schema, including nested fields for relations
function getSchemaFields(schema: ReturnType<typeof getSchema>): string[] {
  const fields: string[] = [];

  // Helper to get the underlying schema, bypassing transforms
  const getBaseSchema = (schema: z.ZodTypeAny): z.ZodObject<z.ZodRawShape> => {
    if (schema instanceof z.ZodEffects) {
      return getBaseSchema(schema.innerType());
    }
    if (schema instanceof z.ZodNullable) {
      return getBaseSchema(schema.unwrap());
    }
    return schema as z.ZodObject<z.ZodRawShape>;
  };

  const baseSchema = getBaseSchema(schema);

  // Process non-meta fields
  for (const [fieldName, fieldSchema] of Object.entries(baseSchema.shape)) {
    if (fieldName === 'meta') continue;

    // If this is a nullable field, get the inner schema
    const innerSchema =
      fieldSchema instanceof z.ZodNullable ? fieldSchema.unwrap() : fieldSchema;

    // For object schemas, check if it's a relation (has an id field)
    const baseInnerSchema = getBaseSchema(innerSchema);
    if (baseInnerSchema instanceof z.ZodObject) {
      if ('id' in baseInnerSchema.shape) {
        // Get all fields except meta, which is not a real field itself
        const relationFields = Object.keys(baseInnerSchema.shape).filter(
          (field) => field !== 'meta',
        );
        // Include meta's fields
        if ('meta' in baseInnerSchema.shape) {
          const metaSchema = baseInnerSchema.shape.meta;
          const baseMetaSchema = getBaseSchema(metaSchema);

          relationFields.push(
            ...Object.keys(baseMetaSchema.shape).filter(
              // Exclude parent field and transformed fields from relations
              (field) => field !== 'parent' && field !== 'html_path',
            ),
          );
        }
        fields.push(`${fieldName}(${relationFields.join(',')})`);
      } else {
        fields.push(fieldName);
      }
    } else {
      fields.push(fieldName);
    }
  }

  // Add top-level meta fields, excluding parent and transformed fields
  if ('meta' in baseSchema.shape) {
    const metaSchema = baseSchema.shape.meta;
    const baseMetaSchema = getBaseSchema(metaSchema);

    fields.push(
      ...Object.keys(baseMetaSchema.shape).filter(
        (field) => field !== 'parent' && field !== 'html_path',
      ),
    );
  }

  return fields;
}

interface PageResponse<T> {
  meta: {
    total_count: number;
  };
  items: T[];
}

interface APIConfig {
  apiHost: string;
}

export class WagtailAPI {
  private apiHost: string;

  constructor(config: APIConfig) {
    this.apiHost = config.apiHost.replace(/\/$/, '');
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${this.apiHost}${endpoint}`, { headers });

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

  /**
   * Get a single page by path or ID
   */
  async getPage<CT extends ContentType>(
    id: number,
    contentType: CT,
  ): Promise<z.infer<Schema<CT>>>;
  async getPage<CT extends ContentType>(
    path: string,
    contentType: CT,
  ): Promise<z.infer<Schema<CT>>>;
  async getPage<CT extends ContentType>(
    pathOrId: string | number,
    contentType: CT,
  ): Promise<z.infer<Schema<CT>>> {
    const schema = getSchema(contentType);
    // Get base fields and add parent explicitly for detail view
    const fields = [...getSchemaFields(schema), 'parent'].join(',');
    let id: number = typeof pathOrId === 'number' ? pathOrId : -1;

    if (id === -1) {
      // Workaround for https://github.com/wagtail/wagtail/issues/6577
      const data = await this.fetch<unknown>(
        `/api/v2/pages/find/?html_path=${pathOrId}&fields=${fields}`,
      );
      const page = getSchema('wagtailcore.Page').parse(data);
      id = page.id as number;
    }

    const data = await this.fetch<unknown>(
      `/api/v2/pages/${id}/?fields=${fields}`,
    );
    return schema.parse(data);
  }

  /**
   * Get pages of a specific type
   */
  async getPages<CT extends ContentType>(
    contentType: CT,
    params: Record<string, string> = {},
  ) {
    const schema = getSchema(contentType);
    const fields = getSchemaFields(schema).join(',');

    const searchParams = new URLSearchParams({
      ...params,
      type: contentType,
      fields,
    });

    const data = await this.fetch<PageResponse<unknown>>(
      `/api/v2/pages/?${searchParams}`,
    );

    return {
      ...data,
      items: data.items.map(
        (item) => schema.parse(item) as z.infer<Schema<CT>>,
      ),
    };
  }

  /**
   * Get a single image by ID
   */
  async getImage(id: number) {
    const data = await this.fetch<unknown>(`/api/v2/images/${id}/`);
    return getSchema('wagtailimages.Image').parse(data);
  }

  /**
   * Get images
   */
  async getImages(params: Record<string, string> = {}) {
    const searchParams = new URLSearchParams(params);
    const data = await this.fetch<PageResponse<unknown>>(
      `/api/v2/images/?${searchParams}`,
    );

    return {
      ...data,
      items: data.items.map((item) =>
        getSchema('wagtailimages.Image').parse(item),
      ),
    };
  }
}

const api = new WagtailAPI({
  apiHost: process.env.NEXT_PUBLIC_WAGTAIL_API_HOST!,
});

export default api;
