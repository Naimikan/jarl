import type { ReactNode } from 'react';

import { Sidebar } from '@/components/layout/Sidebar';
import { NAVIGATION } from '@/constants';

import './layout.css';

export interface LayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Sidebar pageMap={NAVIGATION} />
      {children}
    </div>
  );
}
