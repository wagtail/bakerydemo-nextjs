import type { breads } from '@/models';
import type { PageComponentProps } from './types';
import BreadCard from '@/components/BreadCard';
import Pagination from '@/components/Pagination';
import api from '@/lib/api';

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

  const { items: breads, meta } = page.id
    ? await api.getPages('breads.BreadPage', {
        child_of: page.id.toString(),
        limit: pageSize.toString(),
        offset: offset.toString(),
      })
    : { items: [], meta: { total_count: 0 } };

  const totalPages = Math.ceil(meta.total_count / pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
      {/* Page Header */}
      <section className="row container" >
        <div className='col-md-12'><h1 className="index-header__title">{page.title}</h1></div>
        <div className='col-sm-12 col-md-7'><p className="index-header__introduction">{page.introduction}</p></div>
      </section>

      {/* Bread Grid */}
      <section className="container">
        {breads.length > 0 ? (
         <div className='grid'>
            {breads.map((bread) => (
              <BreadCard key={bread.id} bread={bread} />
            ))}
        </div>
        ) : (
          <p className="text-center text-gray-600">No breads found.</p>
        )}
      </section>

      {/* Pagination */}
      {meta.total_count > pageSize && (
        <section className="mt-10 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/breads"
          />
        </section>
      )}
    </div>
  );
}
