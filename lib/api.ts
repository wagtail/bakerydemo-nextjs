import { type ContentType, type Schema, getSchema } from '@/models';
import { cache } from 'react';
import { z } from 'zod';

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

// Helper to get relation fields recursively
const getRelationFields = (schema: z.ZodTypeAny): string[] => {
  const baseSchema = getBaseSchema(schema);
  const fields: string[] = [];

  // Get all fields except meta
  for (const [fieldName, fieldSchema] of Object.entries(baseSchema.shape)) {
    if (fieldName === 'meta') continue;

    const innerSchema =
      fieldSchema instanceof z.ZodNullable ? fieldSchema.unwrap() : fieldSchema;

    if (innerSchema instanceof z.ZodObject && 'id' in innerSchema.shape) {
      // This is a relation, get its fields recursively
      const relationFields = getRelationFields(innerSchema);
      fields.push(`${fieldName}(${relationFields.join(',')})`);
    } else {
      fields.push(fieldName);
    }
  }

  // Include meta's fields
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
};

// Helper to get field names from a schema, including nested fields for relations
function getSchemaFields(schema: ReturnType<typeof getSchema>): string[] {
  const fields: string[] = [];

  const baseSchema = getBaseSchema(schema);

  // Process non-meta fields
  for (const [fieldName, fieldSchema] of Object.entries(baseSchema.shape)) {
    if (fieldName === 'meta') continue;

    const innerSchema =
      fieldSchema instanceof z.ZodNullable ? fieldSchema.unwrap() : fieldSchema;

    if (innerSchema instanceof z.ZodArray) {
      // For arrays, check the element schema
      const elementSchema = innerSchema.element;
      // If the array element is an object, check its fields for relations
      if (elementSchema instanceof z.ZodObject) {
        const elementFields = [];
        for (const [elemField, elemSchema] of Object.entries(
          elementSchema.shape,
        )) {
          if (elemField === 'meta') continue;
          const innerElemSchema =
            elemSchema instanceof z.ZodNullable
              ? elemSchema.unwrap()
              : elemSchema;
          if (
            innerElemSchema instanceof z.ZodObject &&
            'id' in innerElemSchema.shape
          ) {
            // This is a relation within the array element
            const relationFields = getRelationFields(innerElemSchema);
            elementFields.push(`${elemField}(${relationFields.join(',')})`);
          } else {
            elementFields.push(elemField);
          }
        }
        fields.push(`${fieldName}(${elementFields.join(',')})`);
      } else {
        fields.push(fieldName);
      }
    } else if (
      innerSchema instanceof z.ZodObject &&
      'id' in innerSchema.shape
    ) {
      // Direct relation
      const relationFields = getRelationFields(innerSchema);
      fields.push(`${fieldName}(${relationFields.join(',')})`);
    } else {
      fields.push(fieldName);
    }
  }

  // Add top-level meta fields
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
      // Return as-is for the base Page type as we don't need any extra fields
      if (contentType === 'wagtailcore.Page') return page;

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

  async getPreview<CT extends ContentType>(contentType: CT, token: string) {
    const schema = getSchema(contentType);
    const fields = getSchemaFields(schema).join(',');
    const data = await this.fetch<unknown>(
      `/api/v2/preview/?content_type=${contentType}&token=${token}&fields=${fields}`,
    );
    return schema.parse(data);
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

api.getPage = cache(api.getPage.bind(api));
api.getPages = cache(api.getPages.bind(api));
api.getPreview = cache(api.getPreview.bind(api));
api.getImage = cache(api.getImage.bind(api));
api.getImages = cache(api.getImages.bind(api));

export default api;
