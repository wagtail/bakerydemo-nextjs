import { getMenuItems } from '@/lib/menu';
import { NavigationLinks } from './NavigationLinks';

export default async function Navigation() {
  const menuItems = await getMenuItems().catch(() => []);

  return (
    <header className="header clearfix">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="container">
        <NavigationLinks menuItems={menuItems} />
      </div>
    </header>
  );
}
