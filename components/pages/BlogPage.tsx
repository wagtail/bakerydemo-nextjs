import type { blog } from '@/models';
import type { PageComponentProps } from './types';
import { formatDate } from '@/lib/format';
import Image from 'next/image';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';

export default async function BlogPage({
  page,
}: PageComponentProps<blog.BlogPage>) {
  return (
    <>
      <section>
        {page.image && (
          <Image
            src={page.image.meta.download_url}
            alt={page.image.title}
            width={800}
            height={600}
            priority
          />
        )}

        <h1>{page.title}</h1>
        {page.subtitle && <p>{page.subtitle}</p>}
        {page.introduction && <p>{page.introduction}</p>}
        {page.date_published && <div>{formatDate(page.date_published)}</div>}
        {page.blog_person_relationship.length > 0 && (
          <div>
            {page.blog_person_relationship.map(({ person }) => (
              <div key={person.id}>
                {person.image && (
                  <Image
                    src={person.image.meta.download_url}
                    alt={person.image.title}
                    width={50}
                    height={50}
                  />
                )}
                <span>
                  {person.first_name} {person.last_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <BaseStreamBlock blocks={page.body} />

        {page.tags.length > 0 && (
          <>
            <p>Find more blog posts with similar tags</p>
            <ul>
              {page.tags.map((tag) => (
                <li key={tag}>
                  <a href={`/blog?tags=${encodeURIComponent(tag)}`}>{tag}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
