'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface WagtailUserbar extends HTMLElement {
    initialiseAxe: () => Promise<void>;
    runAxe: () => Promise<void>;
  }
}

export default function Userbar() {
  const userbarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const apiHost = process.env.NEXT_PUBLIC_WAGTAIL_API_HOST as string;

  useEffect(() => {
    fetch(`${apiHost}/userbar/`)
      .then((res) => res.text())
      .then((userbar) => {
        if (
          !userbarRef.current ||
          // useEffect runs twice in development mode, so we need to bail out if
          // the userbar is already present from the previous fetch() call.
          userbarRef.current.querySelector('wagtail-userbar')
        )
          return;
        userbarRef.current.innerHTML = userbar;
      });
  }, [apiHost]);

  useEffect(() => {
    const userbar =
      userbarRef.current?.querySelector<WagtailUserbar>('wagtail-userbar');
    if (!userbar || !pathname) return;
    userbar.runAxe();
  }, [pathname]);

  return (
    <>
      <div ref={userbarRef} />
      <Script src={`${apiHost}/static/wagtailadmin/js/vendor.js`} />
      <Script src={`${apiHost}/static/wagtailadmin/js/userbar.js`} />
    </>
  );
}
