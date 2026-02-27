import { notFound } from 'next/navigation';
import { iget } from '@/lib/object';
import BlogIndexPage from './BlogIndexPage';
import BlogPage from './BlogPage';
import BreadPage from './BreadPage';
import BreadsIndexPage from './BreadsIndexPage';
import FormPage from './FormPage';
import GalleryPage from './GalleryPage';
import HomePage from './HomePage';
import LocationPage from './LocationPage';
import LocationsIndexPage from './LocationsIndexPage';
import RecipeIndexPage from './RecipeIndexPage';
import RecipePage from './RecipePage';
import StandardPage from './StandardPage';
import type { PageComponentProps } from './types';

const pageComponents = {
  'base.HomePage': HomePage,
  'base.StandardPage': StandardPage,
  'base.FormPage': FormPage,
  'base.GalleryPage': GalleryPage,
  'blog.BlogIndexPage': BlogIndexPage,
  'blog.BlogPage': BlogPage,
  'recipes.RecipeIndexPage': RecipeIndexPage,
  'recipes.RecipePage': RecipePage,
  'breads.BreadsIndexPage': BreadsIndexPage,
  'breads.BreadPage': BreadPage,
  'locations.LocationsIndexPage': LocationsIndexPage,
  'locations.LocationPage': LocationPage,
} as const;

export type PageType = keyof typeof pageComponents;
export type PageComponent = React.ComponentType<PageComponentProps>;

export default pageComponents;

export function getPageComponent(contentType: PageType) {
  // Check if we have a component for this page type
  const PageComponent = iget(pageComponents, contentType) as PageComponent;
  if (!PageComponent) {
    console.error(`No component found for page type: ${contentType}`);
    notFound();
  }
  return PageComponent;
}
