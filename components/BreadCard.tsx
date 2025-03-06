import type { breads } from '@/models';
import Image from 'next/image';
import Link from 'next/link';

interface BreadCardProps {
  bread: breads.BreadPage;
}

export default function BreadCard({ bread }: BreadCardProps) {
  return (
    <article>
      {bread.image && (
        <Link href={`/breads/${bread.meta.slug}`}>
          <figure>
            <Image
              src={bread.image.meta.download_url}
              alt={bread.image.title}
              width={180}
              height={180}
              loading="lazy"
            />
          </figure>
        </Link>
      )}
      <div>
        {
          // FIXME: This should've used an h2, but we use h3 to test the
          // accessibility checker
        }
        <h3>
          <Link href={`/breads/${bread.meta.slug}`}>{bread.title}</Link>
        </h3>
        {(bread.origin || bread.bread_type) && (
          <dl>
            {bread.origin && (
              <>
                <dt>Origin</dt>
                <dd>{bread.origin.title}</dd>
              </>
            )}
            {bread.bread_type && (
              <>
                <dt>Type</dt>
                <dd>{bread.bread_type.title}</dd>
              </>
            )}
          </dl>
        )}
      </div>
    </article>
  );
}
