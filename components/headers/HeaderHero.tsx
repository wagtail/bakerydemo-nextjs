import Image from 'next/image';
import type { wagtailimages } from '@/models';

interface HeaderHeroProps {
  title: string;
  image?: wagtailimages.ImageRendition;
}

export default function HeaderHero({ title, image }: HeaderHeroProps) {
  if (image) {
    return (
      <div className="container-fluid hero">
        <Image
          src={image.full_url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="100vw"
          className="hero-image"
          priority
        />
        <div className="hero__container">
          <h1 className="hero__title">{title}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}
