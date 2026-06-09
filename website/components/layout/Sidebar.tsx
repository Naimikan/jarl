'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cx } from '@jarl/utils';

import type { NavigationSection } from '@/constants';

import './Sidebar.css';

export interface SidebarProps {
  pageMap: NavigationSection[];
}

export const Sidebar = ({ pageMap }: SidebarProps) => {
  const pathname = usePathname();
  const pathnameToUse = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  return pathname !== '/' ? (
    <nav className="sidebar">
      <div className="sidebar__content">
        <ul className="sidebar__sections">
          {pageMap.map((section) => (
            <li className="sidebar__item" key={section.label}>
              <span className="sidebar__item-title">{section.label}</span>
              <ul className="sidebar__subsections">
                {section.items.map((item) => (
                  <li
                    className={cx('sidebar__subsection-item', {
                      'sidebar__subsection-item--active': pathnameToUse === item.href,
                    })}
                    key={item.href}
                  >
                    <Link className="sidebar__subsection-item-link" href={item.href}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  ) : null;
};
