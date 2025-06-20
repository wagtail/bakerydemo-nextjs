import { z } from 'zod';
import wagtailcore from './wagtailcore';
import wagtailimages from './wagtailimages';
import blocks from './blocks/base';

// Operating Hours schema
const operatingHoursSchema = z.object({
  id: z.number().nullable(),
  day: z.enum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']),
  opening_time: z.string().nullable(), // Time as string HH:MM
  closing_time: z.string().nullable(), // Time as string HH:MM
  closed: z.boolean(),
});

// LocationPage schema
const locationPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
  image: wagtailimages.Image.nullable(),
  body: blocks.BaseStreamBlock,
  is_open: z.boolean(),
  address: z.string(),
  lat_long: z
    .string()
    .regex(
      /^((\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?))?$/,
      'Lat Long must be a comma-separated numeric lat and long',
    ),
  hours_of_operation: z.array(operatingHoursSchema),
});

// LocationsIndexPage schema
const locationsIndexPageSchema = wagtailcore.Page.extend({
  introduction: z.string(),
  image: wagtailimages.Image.nullable(),
});

// Export schemas
const schemas = {
  OperatingHours: operatingHoursSchema,
  LocationPage: locationPageSchema,
  LocationsIndexPage: locationsIndexPageSchema,
} as const;

export default schemas;

// Derived TypeScript types
export namespace locations {
  export type OperatingHours = z.infer<typeof schemas.OperatingHours>;
  export type LocationPage = z.infer<typeof schemas.LocationPage>;
  export type LocationsIndexPage = z.infer<typeof schemas.LocationsIndexPage>;
}
