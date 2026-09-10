import ListingCard from '@/components/cards/ListingCard';
import HeaderIndex from '@/components/headers/HeaderIndex';
import Pagination from '@/components/Pagination';
import api from '@/lib/api';
import type { people } from '@/models';
import type { PageComponentProps } from './types';

interface PeopleIndexPageProps
  extends PageComponentProps<people.PeopleIndexPage> {
  searchParams: Promise<{ page: string }>;
}

export default async function PeopleIndexPage({
  page,
  searchParams,
}: PeopleIndexPageProps) {
  const currentPage = Number((await searchParams)?.page || '1');
  const pageSize = 12;
  const offset = (currentPage - 1) * pageSize;

  const { items: persons, count } = page.id
    ? await api.getPages('people.PersonPage', {
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
          {persons.map((person) => (
            <li key={person.id}>
              <ListingCard
                url={person.meta.html_path}
                title={person.title}
                image={person.image_listing}
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
