'use client';

import type { wagtailcore } from '@/models';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationLinksProps = {
  menuItems: wagtailcore.Page[];
};

const normalizePath = (path: string | null) => {
  if (!path) return '';
  return path.replace(/\/$/, ''); // Remove trailing slash
};

export function NavigationLinks({ menuItems }: NavigationLinksProps) {
  const pathname = usePathname();

  // Only set aria-current if pathname is not null
  const isCurrentPage = (path: string) => {
    if (!pathname) return undefined;
    return normalizePath(pathname) === normalizePath(path) ? 'page' : undefined;
  };

  return (
    <>
      <Link href="/" aria-current={isCurrentPage('/')}>
        The Wagtail Bakery
      </Link>

      <nav aria-label="Main">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.meta.html_path}
                aria-current={isCurrentPage(item.meta.html_path)}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
