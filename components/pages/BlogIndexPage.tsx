import BlogListingCard from '@/components/cards/BlogListingCard';
import HeaderIndex from '@/components/headers/HeaderIndex';
import api from '@/lib/api';
import type { blog } from '@/models';
import type { PageComponentProps } from './types';

interface BlogSearchParams {
  tags?: string;
}

export default async function BlogIndexPage({
  page,
  searchParams,
}: PageComponentProps<blog.BlogIndexPage>) {
  const { tags: searchTags } = (await searchParams) as BlogSearchParams;

  const { items: posts } = page.id
    ? await api.getPages('blog.BlogPage', {
        child_of: page.id.toString(),
        ...(searchTags ? { tags: searchTags } : {}),
      })
    : { items: [] };

  return (
    <>
      {!searchTags && (
        <HeaderIndex title={page.title} introduction={page.introduction} />
      )}

      <div className="container">
        {searchTags && (
          <div className="row">
            <div className="col-md-12">
              <h1 className="index-header__title">Blog</h1>
            </div>
            <div className="col-md-12">
              <p className="index-header__introduction">
                Viewing all blog posts sorted by the tag{' '}
                <span className="blog-tags__tag">{searchTags}</span>.
              </p>
            </div>
          </div>
        )}

        <div className="blog-list">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogListingCard
                key={post.id}
                url={post.meta.html_path}
                title={post.title}
                image={post.image_listing}
                introduction={post.introduction}
                date_published={post.date_published}
                authors={post.blog_person_relationship.map(
                  (rel) => `${rel.person.first_name} ${rel.person.last_name}`,
                )}
              />
            ))
          ) : (
            <div className="col-md-12">
              <p>
                Oh, snap. Looks like we were too busy baking to write any blog
                posts. Sorry.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
