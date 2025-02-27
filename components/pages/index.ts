import BlogIndexPage from './BlogIndexPage';
import HomePage from './HomePage';
import StandardPage from './StandardPage';
import type { PageComponentProps } from './types';

const pageComponents = {
  'base.HomePage': HomePage,
  'base.StandardPage': StandardPage,
  'blog.BlogIndexPage': BlogIndexPage,
} as const;

export type PageComponent = React.ComponentType<PageComponentProps>;

export default pageComponents;
