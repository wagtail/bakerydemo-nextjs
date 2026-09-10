import Image from 'next/image';
import Link from 'next/link';
import type { wagtailimages } from '@/models';

interface ListingCardMeta {
  label: string;
  value: string;
}

interface ListingCardProps {
  url: string;
  title: string;
  image?: wagtailimages.ImageRendition;
  h2?: boolean;
  meta?: ListingCardMeta[];
}

export default function ListingCard({
  url,
  title,
  image,
  h2 = false,
  meta,
}: ListingCardProps) {
  const Heading = h2 ? 'h2' : 'h3';

  return (
    <div className="listing-card">
      <Link className="listing-card__link" href={url}>
        {image && (
          <figure className="listing-card__image">
            <Image
              src={image.full_url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
            />
          </figure>
        )}
        <div className="listing-card__contents">
          <Heading className="listing-card__title">{title}</Heading>
          {meta && meta.length > 0 && (
            <table className="listing-card__meta">
              <tbody>
                {meta.map((item) => (
                  <tr key={item.label}>
                    <th scope="row" className="listing-card__meta-category">
                      {item.label}
                    </th>
                    <td className="listing-card__meta-content">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Link>
    </div>
  );
}
