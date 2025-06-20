'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface WagtailUserbar extends HTMLElement {
    initialiseAxe: () => Promise<void>;
    runAxe: () => Promise<void>;
  }
}

export default function Userbar({ hidden = false }: { hidden?: boolean }) {
  const userbarRef = useRef<HTMLDivElement>(null);
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

  return (
    <>
      <div hidden={hidden} ref={userbarRef} />
      <Script src={`${apiHost}/static/wagtailadmin/js/vendor.js`} />
      <Script src={`${apiHost}/static/wagtailadmin/js/userbar.js`} />
    </>
  );
}
