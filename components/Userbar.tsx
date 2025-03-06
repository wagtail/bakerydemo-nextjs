'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

declare global {
  interface HTMLElement {
    initialiseAxe: () => void;
  }
}

export default function Userbar() {
  const userbarRef = useRef<HTMLDivElement>(null);
  const apiHost = process.env.NEXT_PUBLIC_WAGTAIL_API_HOST;

  useEffect(() => {
    // Use an explicit mounted state to prevent running the script twice in
    // React's strict mode.
    fetch(`${process.env.NEXT_PUBLIC_WAGTAIL_API_HOST}/userbar/`)
      .then((res) => res.text())
      .then((userbar) => {
        if (!userbarRef.current) return;
        userbarRef.current.innerHTML = userbar;
      });
  }, []);

  return (
    <>
      <div ref={userbarRef} />
      <Script src={`${apiHost}/static/wagtailadmin/js/userbar.js`} />
      <Script
        src={`${apiHost}/static/wagtailadmin/js/vendor.js`}
        onReady={() => {
          setTimeout(() => {
            document
              .querySelector<HTMLElement>('wagtail-userbar')
              ?.initialiseAxe();
          }, 2000);
        }}
      />
    </>
  );
}
