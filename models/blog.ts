import { z } from 'zod';
import wagtailcore from './wagtailcore';
import wagtailimages from './wagtailimages';
import base from './base';

// BlogPersonRelationship schema
const blogPersonRelationshipSchema = z.object({
  page: wagtailcore.Page,
  person: base.Person,
});

// BlogPage schema
const blogPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
  image: wagtailimages.Image.nullable(),
  body: z.array(z.any()), // StreamField
  subtitle: z.string(),
  tags: z.array(z.string()),
  date_published: z.string().nullable(), // Date as ISO string
  blog_person_relationship: z.array(blogPersonRelationshipSchema),
});

// BlogIndexPage schema
const blogIndexPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
  image: wagtailimages.Image.nullable(),
});

// Export schemas
const schemas = {
  BlogPersonRelationship: blogPersonRelationshipSchema,
  BlogPage: blogPageSchema,
  BlogIndexPage: blogIndexPageSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace blog {
  export type BlogPersonRelationship = z.infer<
    typeof schemas.BlogPersonRelationship
  >;
  export type BlogPage = z.infer<typeof schemas.BlogPage>;
  export type BlogIndexPage = z.infer<typeof schemas.BlogIndexPage>;
}
