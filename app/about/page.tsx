import api from '@/lib/api';
import StandardPage from '@/components/pages/StandardPage';

export default async function About() {
  // Get about page from Wagtail API
  const aboutPage = await api.getPage('/about', 'base.StandardPage');
  return <StandardPage page={aboutPage} />;
}
