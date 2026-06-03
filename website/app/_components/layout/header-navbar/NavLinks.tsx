'use client';

import { usePathname } from 'next/navigation';

import styles from './index.module.scss';

const NAV_ITEMS = [
  { title: 'Docs', href: '/docs' },
  { title: 'Guides', href: '/guides' },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return NAV_ITEMS.map((item) => (
    <a
      aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
      className={styles.anchor}
      href={item.href}
      key={item.href}
    >
      {item.title}
    </a>
  ));
};
