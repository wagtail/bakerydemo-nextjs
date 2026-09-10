import Image from 'next/image';
import HeaderHero from '@/components/headers/HeaderHero';
import api from '@/lib/api';
import type { base } from '@/models';
import type { PageComponentProps } from './types';

export default async function GalleryPage({
  page,
}: PageComponentProps<base.GalleryPage>) {
  const images = page.collection
    ? await api.getImages({ collection: page.collection.id.toString() })
    : null;

  return (
    <>
      <HeaderHero title={page.title} image={page.image_hero} />

      <div className="container gallery__container">
        <div className="row">
          <div className="col-md-8">
            {page.introduction && (
              <p className="gallery__introduction">{page.introduction}</p>
            )}
          </div>
        </div>
        <div className="gallery__grid">
          {images?.items.map((image) => (
            <div key={image.id} className="picture-card">
              <figure className="picture-card__image">
                <Image
                  src={image.meta.download_url}
                  alt={image.title}
                  width={645}
                  height={480}
                  sizes="(max-width: 768px) 150px, 30vw"
                  loading="lazy"
                />
                <div className="picture-card__contents">
                  <p className="picture-card__title">{image.title}</p>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
