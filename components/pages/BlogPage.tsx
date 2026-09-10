import Image from 'next/image';
import HeaderBlog from '@/components/headers/HeaderBlog';
import type { blog } from '@/models';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import type { PageComponentProps } from './types';

export default async function BlogPage({
  page,
}: PageComponentProps<blog.BlogPage>) {
  return (
    <>
      <HeaderBlog
        title={page.title}
        subtitle={page.subtitle}
        introduction={page.introduction}
        date_published={page.date_published}
        image={page.image_hero}
      />

      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="blog__meta">
              {page.blog_person_relationship.length > 0 && (
                <div className="blog__avatars">
                  {page.blog_person_relationship.map(({ person }) => (
                    <div key={person.id} className="blog__author">
                      {person.image && (
                        <Image
                          src={person.image.meta.download_url}
                          alt=""
                          width={50}
                          height={50}
                          className="blog__avatar"
                        />
                      )}
                      {person.first_name} {person.last_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <BaseStreamBlock blocks={page.body} />

            {page.tags.length > 0 && (
              <>
                <p className="blog__tag-introduction">
                  Find more blog posts with similar tags
                </p>
                <div className="blog-tags blog-tags--condensed">
                  <span className="u-sr-only">Filter blog posts by tag</span>
                  {page.tags.map((tag) => (
                    <a
                      key={tag}
                      href={`/blog?tags=${encodeURIComponent(tag)}`}
                      className="blog-tags__pill"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
