import type { base } from '@/models';
import type { PageComponentProps } from './types';

export default async function StandardPage({
  page,
}: PageComponentProps<base.StandardPage>) {
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
