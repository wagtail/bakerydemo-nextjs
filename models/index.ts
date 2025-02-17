import wagtailcore from './wagtailcore';
import wagtailimages from './wagtailimages';
import base from './base';
import breads from './breads';
import recipes from './recipes';
import locations from './locations';
import blog from './blog';

export default {
  wagtailcore,
  wagtailimages,
  base,
  breads,
  recipes,
  locations,
  blog,
} as const;

export type { base } from './base';
export type { breads } from './breads';
export type { recipes } from './recipes';
export type { locations } from './locations';
export type { blog } from './blog';

export type { wagtailcore } from './wagtailcore';
export type { wagtailimages } from './wagtailimages';
