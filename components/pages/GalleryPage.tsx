import Image from 'next/image';
import api from '@/lib/api';
import type { base } from '@/models';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import type { PageComponentProps } from './types';

export default async function GalleryPage({
  page,
}: PageComponentProps<base.GalleryPage>) {
  // If there's a collection, fetch its images
  const images = page.collection
    ? await api.getImages({ collection: page.collection.id.toString() })
    : null;

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
        <p>{page.introduction}</p>
      </section>

      <section>
        <BaseStreamBlock blocks={page.body} />
      </section>

      {images && images.items.length > 0 && (
        <section>
          {images.items.map((image) => (
            <figure key={image.id}>
              <Image
                src={image.meta.download_url}
                alt={image.title}
                width={400}
                height={300}
                loading="lazy"
              />
              {<figcaption>{image.title}</figcaption>}
            </figure>
          ))}
        </section>
      )}
    </>
  );
}
