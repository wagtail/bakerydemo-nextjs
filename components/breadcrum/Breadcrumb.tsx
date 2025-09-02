'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  if (pathSegments.length === 0) {
    return null; // No breadcrumb for homepage
  }

  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb-container ${styles.breadcrumb}`}>
      <div className="container">
        <ol className="breadcrumb">
          <li>
            <Link href="/">Home</Link>
          </li>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const displayText = segment
              .replace(/-/g, ' ') // Replace hyphens with spaces
              .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize each word

            return (
              <li key={href}>
                <svg
                  className={styles.separator}
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L5 5L1 9" stroke="#777" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isLast ? (
                  <span>{displayText}</span>
                ) : (
                  <Link href={href}>{displayText}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}