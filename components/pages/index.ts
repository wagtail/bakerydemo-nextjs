import BlogIndexPage from './BlogIndexPage';
import BlogPage from './BlogPage';
import HomePage from './HomePage';
import StandardPage from './StandardPage';
import BreadsIndexPage from './BreadsIndexPage';
import BreadPage from './BreadPage';
import FormPage from './FormPage';
import type { PageComponentProps } from './types';
import LocationsIndexPage from './LocationsIndexPage';
import LocationPage from './LocationPage';
import RecipeIndexPage from './RecipeIndexPage';

const pageComponents = {
  'base.HomePage': HomePage,
  'base.StandardPage': StandardPage,
  'blog.BlogIndexPage': BlogIndexPage,
  'blog.BlogPage': BlogPage,
  'recipes.RecipeIndexPage': RecipeIndexPage,
  'breads.BreadsIndexPage': BreadsIndexPage,
  'breads.BreadPage': BreadPage,
  'base.FormPage': FormPage,
  'locations.LocationsIndexPage': LocationsIndexPage,
  'locations.LocationPage': LocationPage,
} as const;

export type PageComponent = React.ComponentType<PageComponentProps>;

export default pageComponents;
