'use client';

import { usePathname } from 'next/navigation';
import { normalizePages } from 'nextra/normalize-pages';

import type { PageMapItem } from 'nextra';

import styles from './index.module.scss';

export const NavLinks = ({ pageMap }: { pageMap: PageMapItem[] }) => {
  const pathname = usePathname();

  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: pathname,
  });

  return topLevelNavbarItems.map((item) => {
    const route = item.route || ('href' in item ? item.href : '');

    return (
      <a className={styles.anchor} href={route} key={route}>
        {item.title}
      </a>
    );
  });
};
