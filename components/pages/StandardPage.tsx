import type { base } from '@/models';

export interface StandardPageProps {
  page: base.StandardPage;
}

export default async function StandardPage({ page }: StandardPageProps) {
  return (
    <>
      <section>
        <h1>{page.title}</h1>
        <p>{page.introduction}</p>
      </section>
      <section>
        {page.body.map(({ id, value }) => (
          <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </section>
    </>
  );
}
