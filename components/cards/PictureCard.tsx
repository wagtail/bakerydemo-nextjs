import Image from 'next/image';
import Link from 'next/link';
import type { wagtailimages } from '@/models';

interface PictureCardProps {
  url: string;
  title: string;
  image: wagtailimages.Image;
  portrait?: boolean;
}

export default function PictureCard({
  url,
  title,
  image,
  portrait = false,
}: PictureCardProps) {
  const Heading = portrait ? 'h3' : 'h2';
  const width = portrait ? 433 : 645;
  const height = portrait ? 487 : 480;
  const sizes = portrait
    ? '(max-width: 768px) 125px, 400px'
    : '(max-width: 768px) 150px, 30vw';

  return (
    <div className="picture-card">
      <Link className="picture-card__link" href={url}>
        <figure
          className="picture-card__image"
          style={{
            overflow: 'hidden',
            width: '100%',
            aspectRatio: portrait ? '433/487' : '645/480',
          }}
        >
          <Image
            src={image.meta.download_url}
            alt={image.title}
            width={width}
            height={height}
            sizes={sizes}
            loading="lazy"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
          <div className="picture-card__contents">
            <Heading className="picture-card__title">{title}</Heading>
          </div>
        </figure>
      </Link>
    </div>
  );
}