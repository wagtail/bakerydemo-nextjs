import HeaderHero from '@/components/headers/HeaderHero';
import type { breads } from '@/models';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import type { PageComponentProps } from './types';

export default async function BreadPage({
  page,
}: PageComponentProps<breads.BreadPage>) {
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
                <div className="hidden-md-down">
                  <BaseStreamBlock blocks={page.body} />
                </div>
              </div>
            </div>

            <div className="col-md-4 col-md-offset-1">
              <div className="row">
                <div className="bread-detail__meta">
                  {/* v3 migration: origin (breads.Country) removed - no
                  snippet API endpoint exists for Country in v3-preview, so
                  its title can't be resolved. Was:
                  {page.origin && (
                    <>
                      <p className="bread-detail__meta-title">Origin</p>
                      <p className="bread-detail__meta-content">
                        {page.origin.title}
                      </p>
                    </>
                  )}
                  */}
                  {page.bread_type && (
                    <>
                      <p className="bread-detail__meta-title">Type</p>
                      <p className="bread-detail__meta-content">
                        {page.bread_type.title}
                      </p>
                    </>
                  )}
                  {page.ingredients.length > 0 && (
                    <>
                      <h4>Ingredients</h4>
                      <ul>
                        {page.ingredients.map((ingredient) => (
                          <li key={ingredient.id}>
                            {'name' in ingredient ? (
                              ingredient.name
                            ) : (
                              <span className="bread-detail__meta-ingredient--draft">
                                Draft ingredient
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="row hidden-md-up">
                <BaseStreamBlock blocks={page.body} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
