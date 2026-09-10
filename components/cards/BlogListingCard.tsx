import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/format';
import type { wagtailimages } from '@/models';

function truncateWords(text: string, count: number): string {
  const words = text.split(/\s+/);
  if (words.length <= count) return text;
  return `${words.slice(0, count).join(' ')} …`;
}

interface BlogListingCardProps {
  url: string;
  title: string;
  image?: wagtailimages.ImageRendition;
  introduction?: string | null;
  date_published?: string | null;
  authors?: string[];
}

export default function BlogListingCard({
  url,
  title,
  image,
  introduction,
  date_published,
  authors,
}: BlogListingCardProps) {
  return (
    <div className="blog-listing-card">
      <Link className="blog-listing-card__link" href={url}>
        {image && (
          <figure className="blog-listing-card__image">
            <Image
              src={image.full_url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
            />
          </figure>
        )}
        <div className="blog-listing-card__contents">
          <h2 className="blog-listing-card__title">{title}</h2>
          {introduction && (
            <p className="blog-listing-card__introduction">
              {truncateWords(introduction, 15)}
            </p>
          )}
          <p className="blog-listing-card__metadata">
            {date_published && <>{formatDate(date_published)} by </>}
            {authors?.join(', ')}
          </p>
        </div>
      </Link>
    </div>
  );
}
