import { z } from 'zod';
import blocks from './blocks/base';
import wagtailcore from './wagtailcore';
import wagtailimages from './wagtailimages';

// Country schema
const countrySchema = z.object({
  id: z.number().nullable(),
  title: z.string().max(100),
  meta: wagtailcore._BaseMeta,
});

// BreadIngredient schema
const breadIngredientSchema = z.object({
  id: z.number().nullable(),
  name: z.string().max(255),
  meta: wagtailcore._BaseMeta,
});

// BreadType schema
const breadTypeSchema = z.object({
  id: z.number().nullable(),
  title: z.string().max(255),
  meta: wagtailcore._BaseMeta,
});

// BreadPage schema
const breadPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
  image: wagtailimages.Image.nullable(),
  body: blocks.BaseStreamBlock,
  origin: countrySchema.nullable(),
  bread_type: breadTypeSchema.nullable(),
  ingredients: z.array(breadIngredientSchema),
});

// BreadsIndexPage schema
const breadsIndexPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
  image: wagtailimages.Image.nullable(),
});

// Export schemas
const schemas = {
  Country: countrySchema,
  BreadIngredient: breadIngredientSchema,
  BreadType: breadTypeSchema,
  BreadPage: breadPageSchema,
  BreadsIndexPage: breadsIndexPageSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace breads {
  export type Country = z.infer<typeof schemas.Country>;
  export type BreadIngredient = z.infer<typeof schemas.BreadIngredient>;
  export type BreadType = z.infer<typeof schemas.BreadType>;
  export type BreadPage = z.infer<typeof schemas.BreadPage>;
  export type BreadsIndexPage = z.infer<typeof schemas.BreadsIndexPage>;
}
