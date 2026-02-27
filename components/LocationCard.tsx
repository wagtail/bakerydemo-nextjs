import Image from 'next/image';
import Link from 'next/link';
import type { locations } from '@/models';

interface LocationCardProps {
  location: locations.LocationPage;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <article>
      <Link href={`/locations/${location.meta.slug}`}>
        {location.image && (
          <figure>
            <Image
              src={location.image.meta.download_url}
              alt={location.image.title}
              width={645}
              height={480}
              loading="lazy"
            />
            <figcaption>
              <h3>{location.title}</h3>
            </figcaption>
          </figure>
        )}
      </Link>
    </article>
  );
}
