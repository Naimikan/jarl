import { Footer } from './footer';
import { Header } from './header';
import { Sidebar } from './sidebar';

import type { PageMapItem } from 'nextra';
import type { ReactNode } from 'react';

import styles from './index.module.scss';

export interface LayoutProps {
  children: ReactNode;
  pageMap: PageMapItem[];
}

export const Layout = ({ children, pageMap }: LayoutProps) => (
  <>
    <Header pageMap={pageMap} />
    <div className={styles.layout}>
      <Sidebar pageMap={pageMap} />
      {children}
    </div>
    <Footer />
  </>
);
