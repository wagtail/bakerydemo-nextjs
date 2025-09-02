import Link from 'next/link';
import type { breads } from '@/models';
import styles from './BreadCard.module.css';

interface BreadCardProps {
  bread: breads.BreadPage;
}

export default function BreadCard({ bread }: BreadCardProps) {
  console.log(bread, "0---0-0-0-0-0-0---0-0");

  return (
    <Link href={bread.meta.html_path} className={styles.cardLink}>
      <article className={styles.card}>
        {/* Image */}
        {bread.image && (
          <div className={styles.imageWrapper}>
            <img
              src={bread.image.meta.download_url}
              alt={bread.image.title}
              className={`${styles.image} listing-card__image`}
            />
          </div>
        )}

        {/* Text */}
        <div className={styles.content}>
          <h3 className={`listing-card__title ${styles.titleScope}`}>
            {bread.title}
          </h3>
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
        </div>
      </article>
    </Link>
  );
}
