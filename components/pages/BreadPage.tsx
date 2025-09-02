import type { breads } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';

export default async function BreadPage({
  page,
}: PageComponentProps<breads.BreadPage>) {
  return (
    <>
      {/* HERO */}
      <section className="bread-hero">
        {page.image && (
          <div className="bread-image">
            <Image
              src={page.image.meta.download_url}
              alt={page.image.title}
              fill
              priority
              sizes="100vw"
              className="bread-image-el"
            />
          </div>
        )}

        {/* Orange title slab, LEFT aligned */}
        <div className="bread-title-box">
          <h1 className="bread-title">{page.title}</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bread-details row">
        <div className="bread-container container col-md-12">
          <div className="bread-grid">
            {/* LEFT COLUMN */}
            <div className="bread-main">
              {page.introduction && (
                <p className="bread-intro">{page.introduction}</p>
              )}

              <div className="bread-body">
                <BaseStreamBlock blocks={page.body} />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            {(page.origin || page.bread_type) && (
              <aside className="bread-aside">
                {page.origin && (
                  <div className="bread-aside-item">
                    <h4>Origin</h4>
                    <p>{page.origin.title}</p>
                  </div>
                )}
                {page.bread_type && (
                  <div className="bread-aside-item">
                    <h4>Type</h4>
                    <p>{page.bread_type.title}</p>
                  </div>
                )}
              </aside>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
