import api from '@/lib/api';

export default async function Home() {
  // Get home page from Wagtail API
  const homePage = await api.getPage('/', 'base.HomePage');
  return (
    <>
      <section>
        <h1>{homePage.title}</h1>
        <p>{homePage.hero_text}</p>
        {homePage.hero_cta_link ? (
          <a href={homePage.hero_cta_link.meta.slug}>{homePage.hero_cta}</a>
        ) : null}
      </section>
      <section>
        {homePage.body.map(({ id, value }) => (
          <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </section>
    </>
  );
}
