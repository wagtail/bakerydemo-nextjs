import BlogIndexPage from './BlogIndexPage';
import BlogPage from './BlogPage';
import HomePage from './HomePage';
import StandardPage from './StandardPage';
import BreadsIndexPage from './BreadsIndexPage';
import type { PageComponentProps } from './types';

const pageComponents = {
  'base.HomePage': HomePage,
  'base.StandardPage': StandardPage,
  'blog.BlogIndexPage': BlogIndexPage,
  'blog.BlogPage': BlogPage,
  'breads.BreadsIndexPage': BreadsIndexPage,
} as const;

export type PageComponent = React.ComponentType<PageComponentProps>;

export default pageComponents;
