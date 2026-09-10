import { z } from 'zod';
import { ImageSchema as GeneratedImageSchema } from '@/lib/generated/schemas';

// Full image schema (as returned by GET /images/{id}/, and as hydrated by
// lib/api.ts in place of the thin `ImageForeignKeySchema` stubs nested
// inside page/snippet responses).
const imageSchema = GeneratedImageSchema.extend({
  meta: GeneratedImageSchema.shape.meta.extend({
    download_url: z
      .string()
      .transform((url) => `${process.env.NEXT_PUBLIC_WAGTAIL_API_HOST!}${url}`),
  }),
});

// Pre-rendered image rendition schema (e.g. `image_hero`, `image_listing`,
// `image_picture_card` on page schemas) - ready to use directly, no
// hydration required.
const imageRenditionSchema = z.object({
  url: z.string(),
  full_url: z.string(),
  width: z.number(),
  height: z.number(),
  alt: z.string(),
});

// Images nested inside StreamField block values are expanded inline by v3,
// but as a leaner shape than the full `GET /images/{id}/` response (no
// top-level width/height) - dimensions/alt instead come from a `rendition`
// sub-object alongside `download_url`.
const streamFieldImageSchema = z.object({
  id: z.number(),
  title: z.string(),
  meta: z.object({
    type: z.string(),
    download_url: z
      .string()
      .transform((url) => `${process.env.NEXT_PUBLIC_WAGTAIL_API_HOST!}${url}`),
    rendition: imageRenditionSchema,
  }),
});

// Export schemas
const schemas = {
  Image: imageSchema,
  ImageRendition: imageRenditionSchema,
  StreamFieldImage: streamFieldImageSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace wagtailimages {
  export type Image = z.infer<typeof schemas.Image>;
  export type ImageRendition = z.infer<typeof schemas.ImageRendition>;
  export type StreamFieldImage = z.infer<typeof schemas.StreamFieldImage>;
}
