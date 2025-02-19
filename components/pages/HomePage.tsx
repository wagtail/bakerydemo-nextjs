import type { base } from '@/models';

export interface HomePageProps {
  page: base.HomePage;
}

export default async function HomePage({ page }: HomePageProps) {
  return (
    <>
      <section>
        <h1>{page.title}</h1>
        <p>{page.hero_text}</p>
        {page.hero_cta_link ? (
          <a href={page.hero_cta_link.meta.slug}>{page.hero_cta}</a>
        ) : null}
      </section>
      <section>
        {page.body.map(({ id, value }) => (
          <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </section>
    </>
  );
}
