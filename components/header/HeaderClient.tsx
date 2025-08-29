'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { NavigationLinksProps } from '@/lib/menu'; // keep your existing type

import styles from './Header.module.css';

function toPath(url: string) {
  try {
    return new URL(url).pathname || '/';
  } catch {
    return url || '/';
  }
}

export default function HeaderClient({ menuItems }: NavigationLinksProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';

  return (
    <header className={styles.header}>
      <div className="container d-flex align-items-center">
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink}>
            The Wagtail Bakery
          </Link>
        </div>

        {/* thin vertical separator like bakerydemo */}
        <div className={styles.separator} aria-hidden />

        {/* Navigation */}
        <nav className={styles.navWrapper} aria-label="Primary">
          <ul className={styles.navList}>
            {menuItems.map((item) => {
              // item.meta.html_path is used in your repo earlier; fallback to item.url if missing
              const href = toPath(item.meta?.html_path ?? (item.meta.html_path as string) ?? '/');
              const active = pathname === href;
              return (
                <li key={item.id} className={styles.navItem}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ${active ? styles.active : ''}`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Search on the far right — input only, no button */}
        <div className="ms-auto">
          <div className={styles.search}>
            <input
              type="search"
              name="query"
              aria-label="Search"
              placeholder="Search"
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
