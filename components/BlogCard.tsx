import type { blog } from '@/models';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  blog: blog.BlogPage;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article>
      {blog.image && (
        <Link href={`/blog/${blog.meta.slug}`}>
          <figure>
            <Image
              src={blog.image.meta.download_url}
              alt={blog.image.title}
              width={320}
              height={240}
              loading="lazy"
            />
          </figure>
        </Link>
      )}
      <div>
        <h2>
          <Link href={`/blog/${blog.meta.slug}`}>{blog.title}</Link>
        </h2>
        {blog.introduction && <p>{blog.introduction}</p>}
        <p>
          {blog.date_published && (
            <>
              {new Date(blog.date_published).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {blog.blog_person_relationship.length > 0 && ' by '}
            </>
          )}
          {blog.blog_person_relationship.map((rel, index) => (
            <span key={rel.person.id}>
              {rel.person.first_name} {rel.person.last_name}
              {index < blog.blog_person_relationship.length - 1 && ', '}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}
