import { z } from 'zod';
import {
  RecipeIndexPageSchema as GeneratedRecipeIndexPageSchema,
  RecipePageSchema as GeneratedRecipePageSchema,
  RecipePersonRelationshipSchema as GeneratedRecipePersonRelationshipSchema,
} from '@/lib/generated/schemas';
import base from './base';
import blocks from './blocks';
import { withHtmlPath } from './wagtailcore';

// RecipePersonRelationship schema
const recipePersonRelationshipSchema =
  GeneratedRecipePersonRelationshipSchema.extend({
    person: base.Person,
  });

// RecipePage schema
const recipePageSchema = GeneratedRecipePageSchema.extend({
  meta: withHtmlPath(GeneratedRecipePageSchema.shape.meta),
  backstory: blocks.base.BaseStreamBlock,
  body: blocks.recipes.RecipeStreamBlock,
  recipe_person_relationship: z.array(recipePersonRelationshipSchema),
});

// RecipeIndexPage schema
const recipeIndexPageSchema = GeneratedRecipeIndexPageSchema.extend({
  meta: withHtmlPath(GeneratedRecipeIndexPageSchema.shape.meta),
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
