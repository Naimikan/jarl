'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAVIGATION } from '@/constants';

const defaultDocsUrl = NAVIGATION.find((each) => each.label === 'Get Started')?.items[0].href;

const NAV_ITEMS = [
  { title: 'Docs', href: defaultDocsUrl ?? '/' },
  { title: 'Guides', href: '/guides' },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return NAV_ITEMS.map((item) => (
    <Link
      aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
      className="anchor"
      href={item.href}
      key={item.href}
    >
      {item.title}
    </Link>
  ));
};
