import { z } from 'zod';
import {
  CollectionForeignKeySchema,
  FormFieldSchema as GeneratedFormFieldSchema,
  FormPageSchema as GeneratedFormPageSchema,
  GalleryPageSchema as GeneratedGalleryPageSchema,
  HomePageSchema as GeneratedHomePageSchema,
  PersonSchema as GeneratedPersonSchema,
  StandardPageSchema as GeneratedStandardPageSchema,
} from '@/lib/generated/schemas';
import blocks from './blocks/base';
import { pageLinkSchema, withHtmlPath } from './wagtailcore';
import wagtailimages from './wagtailimages';

// Person schema
const personSchema = GeneratedPersonSchema.extend({
  image: wagtailimages.Image.nullable(),
  image_listing: wagtailimages.ImageRendition.optional(),
});

// Standard Page schema
const standardPageSchema = GeneratedStandardPageSchema.extend({
  meta: withHtmlPath(GeneratedStandardPageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
  body: blocks.BaseStreamBlock,
  image_hero: wagtailimages.ImageRendition.optional(),
});

// Home Page schema
const homePageSchema = GeneratedHomePageSchema.extend({
  meta: withHtmlPath(GeneratedHomePageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
  lead_image: wagtailimages.Image.nullable(),
  body: blocks.BaseStreamBlock,
  hero_cta_link: pageLinkSchema.nullable(),
  featured_section_1: pageLinkSchema.nullable(),
  featured_section_2: pageLinkSchema.nullable(),
  featured_section_3: pageLinkSchema.nullable(),
  image_hero: wagtailimages.ImageRendition.optional(),
  lead_image_promo: wagtailimages.ImageRendition.optional(),
});

// Gallery Page schema
const galleryPageSchema = GeneratedGalleryPageSchema.extend({
  meta: withHtmlPath(GeneratedGalleryPageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
  collection: CollectionForeignKeySchema.extend({
    id: z.number(),
  }).nullable(),
  image_hero: wagtailimages.ImageRendition.optional(),
});

// Form Field schema
const formFieldSchema = GeneratedFormFieldSchema.extend({
  choices: z
    .string()
    .nullable()
    .transform((val) => (val || '').split(',')),
});

// Form Page schema
const formPageSchema = GeneratedFormPageSchema.extend({
  meta: withHtmlPath(GeneratedFormPageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
  body: blocks.BaseStreamBlock,
  form_fields: z.array(formFieldSchema),
  image_hero: wagtailimages.ImageRendition.optional(),
});

// Export schemas
const schemas = {
  Person: personSchema,
  StandardPage: standardPageSchema,
  HomePage: homePageSchema,
  GalleryPage: galleryPageSchema,
  FormField: formFieldSchema,
  FormPage: formPageSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace base {
  export type Person = z.infer<typeof schemas.Person>;
  export type StandardPage = z.infer<typeof schemas.StandardPage>;
  export type HomePage = z.infer<typeof schemas.HomePage>;
  export type GalleryPage = z.infer<typeof schemas.GalleryPage>;
  export type FormField = z.infer<typeof schemas.FormField>;
  export type FormPage = z.infer<typeof schemas.FormPage>;
}
