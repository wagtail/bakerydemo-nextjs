import type { blog } from '@/models';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/api';

interface BlogSearchParams {
  tags?: string;
}

export interface BlogIndexPageProps {
  page: blog.BlogIndexPage;
  searchParams: Promise<BlogSearchParams>;
}

export default async function BlogIndexPage({
  page,
  searchParams,
}: BlogIndexPageProps) {
  const { tags: searchTags } = await searchParams;

  // Get blog posts that are children of the blog index page
  const { items: posts } = await api.getPages('blog.BlogPage', {
    child_of: page.id.toString(),
    ...(searchTags ? { tags: searchTags } : {}),
  });

  return (
    <>
      <section>
        <h1>{page.title}</h1>
        {searchTags ? (
          <p>
            Viewing all blog posts sorted by the tag <span>{searchTags}</span>.
          </p>
        ) : (
          <p>{page.introduction}</p>
        )}
      </section>

      <section>
        <div>
          {posts.length > 0 ? (
            posts.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p>
              Oh, snap. Looks like we were too busy baking to write any blog
              posts. Sorry.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
