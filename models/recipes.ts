import { z } from 'zod';
import wagtailcore from './wagtailcore';
import base from './base';
import blocks from './blocks/base';

// RecipePersonRelationship schema
const recipePersonRelationshipSchema = z.object({
  id: z.number(),
  person: base.Person,
});

// RecipePage schema
const recipePageSchema = wagtailcore.Page.extend({
  date_published: z.string().nullable(), // Date as ISO string
  subtitle: z.string().max(255),
  introduction: z.string().max(500),
  backstory: blocks.BaseStreamBlock,
  recipe_headline: z.string().max(120),
  body: blocks.BaseStreamBlock,
  recipe_person_relationship: z.array(recipePersonRelationshipSchema),
});

// RecipeIndexPage schema
const recipeIndexPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
});

// Export schemas
const schemas = {
  RecipePersonRelationship: recipePersonRelationshipSchema,
  RecipePage: recipePageSchema,
  RecipeIndexPage: recipeIndexPageSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace recipes {
  export type RecipePersonRelationship = z.infer<
    typeof schemas.RecipePersonRelationship
  >;
  export type RecipePage = z.infer<typeof schemas.RecipePage>;
  export type RecipeIndexPage = z.infer<typeof schemas.RecipeIndexPage>;
}
