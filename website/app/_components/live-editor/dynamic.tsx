'use client';

import dynamic from 'next/dynamic';

export const LiveEditor = dynamic(() => import('./index').then((m) => m.LiveEditor), {
  ssr: false,
});
