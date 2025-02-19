import api from '@/lib/api';

export default async function About() {
  // Get about page from Wagtail API
  const aboutPage = await api.getPage('/about', 'base.StandardPage');
  return (
    <>
      <section>
        <h1>{aboutPage.title}</h1>
        <p>{aboutPage.introduction}</p>
      </section>
      <section>
        {aboutPage.body.map(({ id, value }) => (
          <div key={id} dangerouslySetInnerHTML={{ __html: value }} />
        ))}
      </section>
    </>
  );
}
