import { z } from 'zod';
import {
  BreadIngredientSchema,
  BreadTypeSchema,
  BreadPageSchema as GeneratedBreadPageSchema,
  BreadsIndexPageSchema as GeneratedBreadsIndexPageSchema,
} from '@/lib/generated/schemas';
import blocks from './blocks/base';
import { withHtmlPath } from './wagtailcore';
import wagtailimages from './wagtailimages';

// BreadPage schema
const breadPageSchema = GeneratedBreadPageSchema.extend({
  meta: withHtmlPath(GeneratedBreadPageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
  body: blocks.BaseStreamBlock,
  bread_type: BreadTypeSchema.nullable(),
  // Bare snippet IDs in the API response; hydrated to full BreadIngredient
  // objects (or left as a bare id if the snippet can't be resolved, e.g.
  // draft/deleted) by lib/api.ts before rendering.
  ingredients: z.array(
    z.union([BreadIngredientSchema, z.object({ id: z.number() })]),
  ),
  image_hero: wagtailimages.ImageRendition.optional(),
  image_listing: wagtailimages.ImageRendition.optional(),
});

// BreadsIndexPage schema
const breadsIndexPageSchema = GeneratedBreadsIndexPageSchema.extend({
  meta: withHtmlPath(GeneratedBreadsIndexPageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
});

// Export schemas
const schemas = {
  BreadPage: breadPageSchema,
  BreadsIndexPage: breadsIndexPageSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace breads {
  export type BreadPage = z.infer<typeof schemas.BreadPage>;
  export type BreadsIndexPage = z.infer<typeof schemas.BreadsIndexPage>;
}
