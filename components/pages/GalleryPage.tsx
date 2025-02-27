import type { base } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';
import api from '@/lib/api';

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
        {page.body.map(({ id, value }) => (
          <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
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
