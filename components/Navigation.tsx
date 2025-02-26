import Link from 'next/link';
import { getMenuItems } from '@/lib/menu';
import { NavigationLinks } from './NavigationLinks';

export default async function Navigation() {
  const menuItems = await getMenuItems();

  return (
    <header>
      <Link href="#main">Skip to main content</Link>
      <div>
        <div>
          <NavigationLinks menuItems={menuItems} />
        </div>
      </div>
    </header>
  );
}
