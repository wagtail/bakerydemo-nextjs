import { z } from 'zod';
import base from './base';
import blocks from './blocks';
import wagtailcore from './wagtailcore';

// RecipePersonRelationship schema
const recipePersonRelationshipSchema = z.object({
  id: z.number().nullable(),
  person: base.Person,
});

// RecipePage schema
const recipePageSchema = wagtailcore.Page.extend({
  date_published: z.string().nullable(), // Date as ISO string
  subtitle: z.string().max(255),
  introduction: z.string().max(500),
  backstory: blocks.base.BaseStreamBlock,
  recipe_headline: z.string().max(120),
  body: blocks.recipes.RecipeStreamBlock,
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
