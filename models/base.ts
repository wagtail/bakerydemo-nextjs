import { z } from 'zod';
import wagtailcore from './wagtailcore';
import wagtailimages from './wagtailimages';

// Person schema
const personSchema = z.object({
  id: z.number(),
  first_name: z.string().max(254),
  last_name: z.string().max(254),
  job_title: z.string().max(254),
  image: wagtailimages.Image.nullable(),
  meta: z.object({
    type: z.string(),
    detail_url: z.string(),
    html_url: z.string().nullable(),
  }),
});

// Footer Text schema
const footerTextSchema = z.object({
  id: z.number(),
  body: z.string(),
  meta: z.object({
    type: z.string(),
    detail_url: z.string(),
    html_url: z.string().nullable(),
  }),
});

// Standard Page schema
const standardPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
  image: wagtailimages.Image.nullable(),
  body: z.array(z.any()), // StreamField - complex structure, simplified here
});

// Home Page schema
const homePageSchema = wagtailcore.Page.extend({
  image: wagtailimages.Image.nullable(),
  hero_text: z.string().max(255),
  hero_cta: z.string().max(255),
  hero_cta_link: wagtailcore.Page.nullable(),
  body: z.array(z.any()), // StreamField
  promo_image: wagtailimages.Image.nullable(),
  promo_title: z.string().max(255),
  promo_text: z.string().max(1000).nullable(),
  featured_section_1_title: z.string().max(255),
  featured_section_1: wagtailcore.Page.nullable(),
  featured_section_2_title: z.string().max(255),
  featured_section_2: wagtailcore.Page.nullable(),
  featured_section_3_title: z.string().max(255),
  featured_section_3: wagtailcore.Page.nullable(),
});

// Gallery Page schema
const galleryPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
  image: wagtailimages.Image.nullable(),
  body: z.array(z.any()), // StreamField
  collection: z
    .object({
      id: z.number(),
    })
    .nullable(),
});

// Form Field schema
const formFieldSchema = z.object({
  id: z.number(),
  label: z.string(),
  field_type: z.string(),
  required: z.boolean(),
  choices: z.string().nullable(),
  default_value: z.string().nullable(),
  help_text: z.string().nullable(),
});

// Form Page schema
const formPageSchema = wagtailcore.Page.extend({
  image: wagtailimages.Image.nullable(),
  body: z.array(z.any()), // StreamField
  thank_you_text: z.string(),
  from_address: z.string().email(),
  to_address: z.string().email(),
  subject: z.string(),
  form_fields: z.array(formFieldSchema),
});

// Generic Settings schema
const genericSettingsSchema = z.object({
  id: z.number(),
  mastodon_url: z.string().url().optional(),
  github_url: z.string().url().optional(),
  organisation_url: z.string().url().optional(),
});

// Site Settings schema
const siteSettingsSchema = z.object({
  id: z.number(),
  title_suffix: z.string().max(255).default('The Wagtail Bakery'),
});

// Export schemas
const schemas = {
  Person: personSchema,
  FooterText: footerTextSchema,
  StandardPage: standardPageSchema,
  HomePage: homePageSchema,
  GalleryPage: galleryPageSchema,
  FormField: formFieldSchema,
  FormPage: formPageSchema,
  GenericSettings: genericSettingsSchema,
  SiteSettings: siteSettingsSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace base {
  export type Person = z.infer<typeof schemas.Person>;
  export type FooterText = z.infer<typeof schemas.FooterText>;
  export type StandardPage = z.infer<typeof schemas.StandardPage>;
  export type HomePage = z.infer<typeof schemas.HomePage>;
  export type GalleryPage = z.infer<typeof schemas.GalleryPage>;
  export type FormField = z.infer<typeof schemas.FormField>;
  export type FormPage = z.infer<typeof schemas.FormPage>;
  export type GenericSettings = z.infer<typeof schemas.GenericSettings>;
  export type SiteSettings = z.infer<typeof schemas.SiteSettings>;
}
