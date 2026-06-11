import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';

export interface LayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
