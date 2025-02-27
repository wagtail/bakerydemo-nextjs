import type { blog, recipes } from '@/models';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/format';

interface BlogCardProps {
  page: blog.BlogPage | recipes.RecipePage;
}

export default function BlogCard({ page }: BlogCardProps) {
  const isBlog = 'blog_person_relationship' in page;
  const relation = isBlog
    ? page.blog_person_relationship
    : page.recipe_person_relationship;

  return (
    <article>
      {isBlog && page.image && (
        <Link href={page.meta.html_path}>
          <figure>
            <Image
              src={page.image.meta.download_url}
              alt={page.image.title}
              width={320}
              height={240}
              loading="lazy"
            />
          </figure>
        </Link>
      )}
      <div>
        <h2>
          <Link href={page.meta.html_path}>{page.title}</Link>
        </h2>
        {page.introduction && <p>{page.introduction}</p>}
        <p>
          {page.date_published && (
            <>
              {formatDate(page.date_published)}
              {relation.length > 0 && ' by '}
            </>
          )}
          {relation.map((rel, index) => (
            <span key={rel.person.id}>
              {rel.person.first_name} {rel.person.last_name}
              {index < relation.length - 1 && ', '}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}
