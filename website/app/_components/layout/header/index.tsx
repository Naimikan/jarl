import { HeaderNavbar } from '../header-navbar';

import type { PageMapItem } from 'nextra';

import styles from './index.module.scss';

export interface HeaderProps {
  pageMap: PageMapItem[];
}

export const Header = ({ pageMap }: HeaderProps) => (
  <header className={styles.header}>
    <HeaderNavbar pageMap={pageMap} />
  </header>
);
