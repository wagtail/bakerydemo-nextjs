import Image from 'next/image';
import { formatDate } from '@/lib/format';
import type { wagtailimages } from '@/models';

interface HeaderBlogProps {
  title: string;
  subtitle?: string | null;
  introduction?: string | null;
  date_published?: string | null;
  image?: wagtailimages.ImageRendition;
}

export default function HeaderBlog({
  title,
  subtitle,
  introduction,
  date_published,
  image,
}: HeaderBlogProps) {
  return (
    <>
      {image && (
        <div className="container-fluid hero hero--blog">
          <Image
            src={image.full_url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            className="hero-image"
            priority
          />
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-9">
            <h1 className="index-header__title index-header__title--blog">
              {title}
            </h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="col-sm-12 col-md-7">
            {introduction && (
              <p className="index-header__introduction index-header__introduction--blog">
                {introduction}
              </p>
            )}
            {date_published && (
              <div className="blog__published">
                {formatDate(date_published)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
