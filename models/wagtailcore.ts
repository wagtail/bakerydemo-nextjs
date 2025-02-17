import { z } from 'zod';

// Base meta schema (shared fields)
const baseMetaSchema = z.object({
  type: z.string(),
  detail_url: z.string(),
  html_url: z.string(),
});

// Parent meta schema (subset of fields)
const parentMetaSchema = baseMetaSchema;

// Full meta schema (all fields)
const pageMetaSchema = baseMetaSchema.extend({
  slug: z.string(),
  show_in_menus: z.boolean(),
  seo_title: z.string(),
  search_description: z.string(),
  first_published_at: z.string().nullable(),
  alias_of: z.number().nullable(),
  locale: z.string(),
});

// Base page schema (without meta to avoid circular reference)
const basePageSchema = z.object({
  id: z.number(),
  title: z.string(),
});

// Parent page schema (with limited meta)
const parentPageSchema = basePageSchema.extend({
  meta: parentMetaSchema,
});

// Full page schema
const pageSchema = basePageSchema.extend({
  meta: pageMetaSchema.extend({
    parent: parentPageSchema.nullable().optional(),
  }),
});

// Export schemas
const schemas = {
  Page: pageSchema,
  _PageMeta: pageMetaSchema, // not a real model
} as const;

export default schemas;

// Derived TypeScript types
export namespace wagtailcore {
  export type Page = z.infer<typeof schemas.Page>;
  export type _PageMeta = z.infer<typeof schemas._PageMeta>;
}
