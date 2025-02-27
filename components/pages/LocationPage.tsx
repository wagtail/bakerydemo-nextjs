import type { locations } from '@/models';
import type { PageComponentProps } from './types';
import Image from 'next/image';

export default async function LocationPage({
  page,
}: PageComponentProps<locations.LocationPage>) {
  return (
    <>
      <section>
        {page.image && (
          <div>
            <Image
              src={page.image.meta.download_url}
              alt={page.image.title}
              width={800}
              height={650}
              priority
            />
          </div>
        )}
        <h1>{page.title}</h1>
        <p>{page.introduction}</p>
      </section>

      <section>
        <div>
          {page.body.map(({ id, value }) => (
            <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
          ))}
        </div>

        <aside>
          <div>
            <h2>Operating Status</h2>
            <p>
              {page.is_open
                ? 'This location is currently open.'
                : 'Sorry, this location is currently closed.'}
            </p>

            <h2>Address</h2>
            <address>{page.address}</address>

            {page.hours_of_operation.length > 0 && (
              <>
                <h2>Opening Hours</h2>
                <ol>
                  {page.hours_of_operation.map((hours) => (
                    <li key={hours.day}>
                      <strong>{hours.day}</strong>:{' '}
                      <span>
                        {hours.closed ? (
                          'Closed'
                        ) : (
                          <>
                            {hours.opening_time && (
                              <time dateTime={hours.opening_time}>
                                {hours.opening_time}
                              </time>
                            )}
                            {' - '}
                            {hours.closing_time && (
                              <time dateTime={hours.closing_time}>
                                {hours.closing_time}
                              </time>
                            )}
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </aside>
      </section>
    </>
  );
}
