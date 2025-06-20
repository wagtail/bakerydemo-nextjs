import type { blog } from '@/models';
import type { PageComponentProps } from './types';
import BlogCard from '@/components/BlogCard';
import api from '@/lib/api';

interface BlogSearchParams {
  tags?: string;
}

export default async function BlogIndexPage({
  page,
  searchParams,
}: PageComponentProps<blog.BlogIndexPage>) {
  const { tags: searchTags } = (await searchParams) as BlogSearchParams;

  // Get blog posts that are children of the blog index page
  const { items: posts } = page.id
    ? await api.getPages('blog.BlogPage', {
        child_of: page.id.toString(),
        ...(searchTags ? { tags: searchTags } : {}),
      })
    : { items: [] };

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
            posts.map((blog) => <BlogCard key={blog.id} page={blog} />)
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
