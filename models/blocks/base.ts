import { z } from 'zod';
import wagtailimages from '../wagtailimages';

// CaptionedImageBlock schema
const captionedImageBlockSchema = z.object({
  type: z.literal('image_block'),
  id: z.string(),
  value: z.object({
    image: wagtailimages.Image,
    caption: z.string().optional(),
    attribution: z.string().optional(),
  }),
});

// HeadingBlock schema
const headingBlockSchema = z.object({
  type: z.literal('heading_block'),
  id: z.string(),
  value: z.object({
    heading_text: z.string(),
    size: z.enum(['h2', 'h3', 'h4']).optional(),
  }),
});

// BlockQuote schema
const blockQuoteSchema = z.object({
  type: z.literal('block_quote'),
  id: z.string(),
  value: z.object({
    text: z.string(),
    attribute_name: z.string().optional(),
  }),
});

// RichText (paragraph) block schema
const paragraphBlockSchema = z.object({
  type: z.literal('paragraph_block'),
  id: z.string(),
  value: z.string(), // HTML string
});

// Embed block schema
const embedBlockSchema = z.object({
  type: z.literal("embed_block"),
  id: z.string(),
  value: z.string().or(
    z.object({
      url: z.string().url(),
      html: z.string(),
    }),
  ),
});

// Base StreamBlock - combines all block types
const baseStreamBlockSchema = z.array(
  z.discriminatedUnion('type', [
    headingBlockSchema,
    paragraphBlockSchema,
    captionedImageBlockSchema,
    blockQuoteSchema,
    embedBlockSchema,
  ]),
);

// Export schemas
const schemas = {
  CaptionedImageBlock: captionedImageBlockSchema,
  HeadingBlock: headingBlockSchema,
  BlockQuote: blockQuoteSchema,
  RichTextBlock: paragraphBlockSchema,
  EmbedBlock: embedBlockSchema,
  BaseStreamBlock: baseStreamBlockSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace blocks {
  export type CaptionedImageBlock = z.infer<typeof schemas.CaptionedImageBlock>;
  export type HeadingBlock = z.infer<typeof schemas.HeadingBlock>;
  export type BlockQuote = z.infer<typeof schemas.BlockQuote>;
  export type RichTextBlock = z.infer<typeof schemas.RichTextBlock>;
  export type EmbedBlock = z.infer<typeof schemas.EmbedBlock>;
  export type BaseStreamBlock = z.infer<typeof schemas.BaseStreamBlock>;
}
