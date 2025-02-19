import api from '@/lib/api';
import HomePage from '@/components/pages/HomePage';

export default async function Home() {
  // Get home page from Wagtail API
  const homePage = await api.getPage('/', 'base.HomePage');
  return <HomePage page={homePage} />;
}
