import { z } from "zod";

// Utility function to remove origin from URL
const removeOrigin = (url: string): string => {
  return url.replace(/^(?:https?:\/\/[^/]+)?/, "");
};

// Base meta fields schema for all models
const baseMetaSchema = z.object({
  type: z.string(),
  detail_url: z.string().optional(),
});

const basePageMetaSchema = baseMetaSchema.extend({
  html_url: z.string(),
});

// Parent meta schema (subset of fields)
const parentMetaSchema = basePageMetaSchema.transform((data) => ({
  ...data,
  // Remove origin from html_url to get the path
  html_path: removeOrigin(data.html_url),
}));

// Base page schema (without meta to avoid circular reference)
const basePageSchema = z.object({
  id: z.number(),
  title: z.string(),
});

// Parent page schema (with limited meta)
const parentPageSchema = basePageSchema.extend({
  meta: parentMetaSchema,
});

// Full meta schema (all fields)
const pageMetaSchema = basePageMetaSchema
  .extend({
    slug: z.string(),
    show_in_menus: z.boolean(),
    seo_title: z.string(),
    search_description: z.string(),
    first_published_at: z.string().nullable(),
    alias_of: parentPageSchema.nullable(),
    locale: z.string(),
    parent: z
      .lazy(() => parentPageSchema)
      .nullable()
      .optional(),
  })
  .transform((data) => ({
    ...data,
    html_path: removeOrigin(data.html_url),
  }));

// Full page schema
const pageSchema = basePageSchema.extend({
  meta: pageMetaSchema,
});

// Export schemas
const schemas = {
  Page: pageSchema,
  _PageMeta: pageMetaSchema, // not a real model
  _BaseMeta: baseMetaSchema, // not a real model
} as const;

export default schemas;

// Derived TypeScript types
export namespace wagtailcore {
  export type Page = z.infer<typeof schemas.Page>;
  export type _PageMeta = z.infer<typeof schemas._PageMeta>;
}
