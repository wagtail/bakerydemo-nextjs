import { z } from 'zod';

const imageSchema = z.object({
  id: z.number(),
  title: z.string(),
  meta: z.object({
    type: z.string(),
    detail_url: z.string(),
    download_url: z.string(),
  }),
});

// Export schemas
const schemas = {
  Image: imageSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace wagtailimages {
  export type Image = z.infer<typeof schemas.Image>;
}
