'use client';

import dynamic from 'next/dynamic';

const DynamicUserbar = dynamic(() => import('./Userbar'), {
  ssr: false,
});

export default DynamicUserbar;
