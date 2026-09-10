import ListingCard from '@/components/cards/ListingCard';
import HeaderIndex from '@/components/headers/HeaderIndex';
import Pagination from '@/components/Pagination';
import api from '@/lib/api';
import type { breads } from '@/models';
import type { PageComponentProps } from './types';

interface BreadsIndexPageProps
  extends PageComponentProps<breads.BreadsIndexPage> {
  searchParams: Promise<{ page: string }>;
}

export default async function BreadsIndexPage({
  page,
  searchParams,
}: BreadsIndexPageProps) {
  const currentPage = Number((await searchParams)?.page || '1');
  const pageSize = 12;
  const offset = (currentPage - 1) * pageSize;

  const { items: breads, count } = page.id
    ? await api.getPages('breads.BreadPage', {
        child_of: page.id.toString(),
        limit: pageSize.toString(),
        offset: offset.toString(),
      })
    : { items: [], count: 0 };

  const totalPages = Math.ceil(count / pageSize);

  return (
    <>
      <HeaderIndex title={page.title} introduction={page.introduction} />

      <div className="container">
        <ul className="bread-list">
          {breads.map((bread) => (
            <li key={bread.id}>
              <ListingCard
                url={bread.meta.html_path}
                title={bread.title}
                image={bread.image_listing}
                h2
                meta={[
                  /* v3 migration: origin (breads.Country) removed from meta -
                    no snippet API endpoint exists for Country in v3-preview.
                  ...(bread.origin
                    ? [{ label: 'Origin', value: bread.origin.title }]
                    : []),
                  */
                  ...(bread.bread_type
                    ? [{ label: 'Type', value: bread.bread_type.title }]
                    : []),
                ]}
              />
            </li>
          ))}
        </ul>
      </div>

      {count > pageSize && (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl=""
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
