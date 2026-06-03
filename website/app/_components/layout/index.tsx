import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

import type { ReactNode } from 'react';

import type { NavigationSection } from '../../constants';

import './index.styles.css';

export interface LayoutProps {
  children: ReactNode;
  pageMap: NavigationSection[];
}

export const Layout = ({ children, pageMap }: LayoutProps) => (
  <>
    <Header />
    <div className="layout">
      <Sidebar pageMap={pageMap} />
      {children}
    </div>
    <Footer />
  </>
);
