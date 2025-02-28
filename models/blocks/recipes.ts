import { z } from 'zod';
import wagtailimages from '../wagtailimages';
import baseBlocks from './base';

// RecipeStep schema
const recipeStepBlockSchema = z.object({
  type: z.literal('recipe_step'),
  id: z.string(),
  value: z.object({
    text: z.string(), // RichText HTML
    difficulty: z.enum(['S', 'M', 'L']),
  }),
});

// Table schema
const tableBlockSchema = z.object({
  type: z.literal('table_block'),
  id: z.string(),
  value: z.object({
    first_row_is_table_header: z.boolean(),
    data: z.array(z.array(z.string())),
  }),
});

// TypedTable cell schemas
const typedTableCellSchema = z.union([
  z.string(),
  z.number(),
  wagtailimages.Image,
]);

// TypedTable schema
const typedTableBlockSchema = z.object({
  type: z.literal('typed_table_block'),
  id: z.string(),
  value: z.object({
    caption: z.string().optional(),
    columns: z.array(
      z.object({
        type: z.string(),
        heading: z.string(),
      }),
    ),
    rows: z.array(
      z.object({
        values: z.array(typedTableCellSchema),
      }),
    ),
  }),
});

// List block schemas
const ingredientsListBlockSchema = z.object({
  type: z.literal('ingredients_list'),
  id: z.string(),
  value: z.array(z.string()), // Array of RichText HTML strings
});

const stepsListBlockSchema = z.object({
  type: z.literal('steps_list'),
  id: z.string(),
  value: z.array(
    z.object({
      text: z.string(), // RichText HTML
      difficulty: z.enum(['S', 'M', 'L']),
    }),
  ),
});

// Recipe StreamBlock - combines base blocks and recipe-specific blocks
const recipeStreamBlockSchema = z.array(
  z.discriminatedUnion('type', [
    // Base blocks
    baseBlocks.HeadingBlock,
    baseBlocks.RichTextBlock,
    baseBlocks.BlockQuote,
    baseBlocks.EmbedBlock,
    baseBlocks.CaptionedImageBlock,
    // Recipe-specific blocks
    tableBlockSchema,
    typedTableBlockSchema,
    ingredientsListBlockSchema,
    stepsListBlockSchema,
  ]),
);

// Export schemas
const schemas = {
  RecipeStep: recipeStepBlockSchema,
  Table: tableBlockSchema,
  TypedTable: typedTableBlockSchema,
  IngredientsList: ingredientsListBlockSchema,
  StepsList: stepsListBlockSchema,
  RecipeStreamBlock: recipeStreamBlockSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace recipeBlocks {
  export type RecipeStep = z.infer<typeof schemas.RecipeStep>;
  export type Table = z.infer<typeof schemas.Table>;
  export type TypedTable = z.infer<typeof schemas.TypedTable>;
  export type IngredientsList = z.infer<typeof schemas.IngredientsList>;
  export type StepsList = z.infer<typeof schemas.StepsList>;
  export type RecipeStreamBlock = z.infer<typeof schemas.RecipeStreamBlock>;
}
