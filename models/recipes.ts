import { z } from 'zod';
import wagtailcore from './wagtailcore';
import base from './base';

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
  backstory: z.array(z.any()), // StreamField with block_counts
  recipe_headline: z.string().max(120), // RichTextField
  body: z.array(z.any()), // StreamField with RecipeStreamBlock
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
