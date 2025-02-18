import wagtailcore from './wagtailcore';
import wagtailimages from './wagtailimages';
import base from './base';
import breads from './breads';
import recipes from './recipes';
import locations from './locations';
import blog from './blog';

// A mapping of model names to their schemas, namespaced by the Django app label
const schemas = {
  wagtailcore,
  wagtailimages,
  base,
  breads,
  recipes,
  locations,
  blog,
} as const;

export default schemas;

export type { base } from './base';
export type { breads } from './breads';
export type { recipes } from './recipes';
export type { locations } from './locations';
export type { blog } from './blog';

export type { wagtailcore } from './wagtailcore';
export type { wagtailimages } from './wagtailimages';

// Get all possible dot paths as a union type
type DottedPaths<T> = {
  [K in keyof T]: T[K] extends object
    ? `${K & string}.${keyof T[K] & string}`
    : never;
}[keyof T];

// Get the type at a specific dotted path
type ValueAtPath<
  T,
  Path extends string,
> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends keyof T[Key]
      ? T[Key][Rest]
      : never
    : never
  : never;

type Schemas = typeof schemas;
type AppLabel = keyof Schemas;
export type ContentType = DottedPaths<Schemas>;
export type Schema<T extends ContentType> = ValueAtPath<Schemas, T>;

export function getSchema<CT extends ContentType>(contentType: CT): Schema<CT> {
  const [appLabel, modelName] = contentType.split('.') as [AppLabel, never];
  return schemas[appLabel][modelName];
}
