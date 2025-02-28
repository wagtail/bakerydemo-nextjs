import { z } from 'zod';

const imageSchema = z.object({
  id: z.number(),
  title: z.string(),
  meta: z.object({
    type: z.string(),
    detail_url: z.string().optional(),
    download_url: z
      .string()
      .transform((url) => `${process.env.NEXT_PUBLIC_WAGTAIL_API_HOST!}${url}`),
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
