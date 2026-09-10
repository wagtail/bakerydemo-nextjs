import HeaderHero from '@/components/headers/HeaderHero';
import type { locations } from '@/models';
import BaseStreamBlock from '../streamfield/BaseStreamBlock';
import type { PageComponentProps } from './types';

export default async function LocationPage({
  page,
}: PageComponentProps<locations.LocationPage>) {
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
                  <h2 className="location__meta-title">Operating Status</h2>
                  <p>
                    {page.is_open
                      ? 'This location is currently open.'
                      : 'Sorry, this location is currently closed.'}
                  </p>

                  <h2 className="location__meta-title">Address</h2>
                  <address
                    dangerouslySetInnerHTML={{
                      __html: page.address.replace(/\n/g, '<br>'),
                    }}
                  />

                  {page.hours_of_operation.length > 0 && (
                    <>
                      <h2 className="location__meta-title">Opening hours</h2>
                      {page.hours_of_operation.map((hours) => (
                        <time key={hours.day} className="location__time">
                          <span className="location__day">{hours.day}</span>:{' '}
                          <span className="location__hours">
                            {hours.closed ? (
                              'Closed'
                            ) : (
                              <>
                                {hours.opening_time} - {hours.closing_time}
                              </>
                            )}
                          </span>
                        </time>
                      ))}
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
