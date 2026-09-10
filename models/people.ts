import { z } from 'zod';
import {
  PeopleIndexPageSchema as GeneratedPeopleIndexPageSchema,
  PersonPageSchema as GeneratedPersonPageSchema,
} from '@/lib/generated/schemas';
import blocks from './blocks/base';
import { withHtmlPath } from './wagtailcore';
import wagtailimages from './wagtailimages';

const socialMediaLinkSchema = z.object({
  type: z.literal('social'),
  id: z.string(),
  value: z.object({
    platform: z.enum([
      'github',
      'twitter',
      'linkedin',
      'instagram',
      'facebook',
      'mastodon',
      'website',
    ]),
    url: z.url(),
  }),
});

const personPageSchema = GeneratedPersonPageSchema.extend({
  meta: withHtmlPath(GeneratedPersonPageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
  body: blocks.BaseStreamBlock,
  social_links: z.array(socialMediaLinkSchema),
  image_hero: wagtailimages.ImageRendition.optional(),
  image_listing: wagtailimages.ImageRendition.optional(),
});

const peopleIndexPageSchema = GeneratedPeopleIndexPageSchema.extend({
  meta: withHtmlPath(GeneratedPeopleIndexPageSchema.shape.meta),
  image: wagtailimages.Image.nullable(),
});

const schemas = {
  SocialMediaLink: socialMediaLinkSchema,
  PersonPage: personPageSchema,
  PeopleIndexPage: peopleIndexPageSchema,
} as const;

export default schemas;

export namespace people {
  export type SocialMediaLink = z.infer<typeof schemas.SocialMediaLink>;
  export type PersonPage = z.infer<typeof schemas.PersonPage>;
  export type PeopleIndexPage = z.infer<typeof schemas.PeopleIndexPage>;
}
