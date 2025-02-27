import api from '@/lib/api';
import BlogIndexPage from '@/pages/BlogIndexPage';

interface BlogPageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function Blog({ searchParams }: BlogPageProps) {
  // Get blog index page from Wagtail API
  const blogIndexPage = await api.getPage('/blog', 'blog.BlogIndexPage');

  return <BlogIndexPage page={blogIndexPage} searchParams={searchParams} />;
}
