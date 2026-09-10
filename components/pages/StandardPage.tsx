import HeaderHero from '@/components/headers/HeaderHero';
import type { base } from '@/models';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import type { PageComponentProps } from './types';

export default async function StandardPage({
  page,
}: PageComponentProps<base.StandardPage>) {
  return (
    <>
      <HeaderHero title={page.title} image={page.image_hero} />

      <div className="container bread-detail">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-7">
              <div className="row">
                {page.introduction && (
                  <p className="bread-detail__introduction">
                    {page.introduction}
                  </p>
                )}
                <BaseStreamBlock blocks={page.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
