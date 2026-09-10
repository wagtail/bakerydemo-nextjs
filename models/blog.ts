import { z } from 'zod';
import {
  BlogIndexPageSchema as GeneratedBlogIndexPageSchema,
  BlogPageSchema as GeneratedBlogPageSchema,
  BlogPersonRelationshipSchema as GeneratedBlogPersonRelationshipSchema,
} from '@/lib/generated/schemas';
import base from './base';
import blocks from './blocks/base';
import { withHtmlPath } from './wagtailcore';
import wagtailimages from './wagtailimages';

// BlogPersonRelationship schema
const blogPersonRelationshipSchema =
  GeneratedBlogPersonRelationshipSchema.extend({
    person: base.Person,
  });

// BlogPage schema
const blogPageSchema = GeneratedBlogPageSchema.extend({
  meta: withHtmlPath(GeneratedBlogPageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
  body: blocks.BaseStreamBlock,
  blog_person_relationship: z.array(blogPersonRelationshipSchema),
  image_hero: wagtailimages.ImageRendition.optional(),
  image_listing: wagtailimages.ImageRendition.optional(),
  image_picture_card: wagtailimages.ImageRendition.optional(),
});

// BlogIndexPage schema
const blogIndexPageSchema = GeneratedBlogIndexPageSchema.extend({
  meta: withHtmlPath(GeneratedBlogIndexPageSchema.shape.meta),
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
