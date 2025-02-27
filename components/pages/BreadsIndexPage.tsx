import type { breads } from '@/models';
import type { PageComponentProps } from './types';
import BreadCard from '@/components/BreadCard';
import api from '@/lib/api';

interface BreadsIndexPageProps {
  page: breads.BreadsIndexPage;
}

export default async function BreadsIndexPage({
  page,
}: PageComponentProps<breads.BreadsIndexPage>) {
  // Get bread pages that are children of the breads index page
  const { items: breads, meta } = await api.getPages('breads.BreadPage', {
    child_of: page.id.toString(),
    limit: '12', // Match Django template's pagination check
  });

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

      {meta.total_count > 12 && (
        <section>
          {/* Pagination component would go here */}
          <p>Pagination needed</p>
        </section>
      )}
    </>
  );
}
