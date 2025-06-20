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

  // Get bread pages that are children of the breads index page
  const { items: breads, meta } = page.id
    ? await api.getPages('breads.BreadPage', {
        child_of: page.id.toString(),
        limit: pageSize.toString(),
        offset: offset.toString(),
      })
    : { items: [], meta: { total_count: 0 } };

  const totalPages = Math.ceil(meta.total_count / pageSize);

  return (
    <>
      <section>
        <h1>{page.title}</h1>
        <p>{page.introduction}</p>
      </section>

      <section>
        {breads.length > 0 ? (
          breads.map((bread) => <BreadCard key={bread.id} bread={bread} />)
        ) : (
          <p>No breads found.</p>
        )}
      </section>

      {meta.total_count > pageSize && (
        <section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl=""
          />
        </section>
      )}
    </>
  );
}
