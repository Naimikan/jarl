'use client';

import { usePathname } from 'next/navigation';
import { Anchor } from 'nextra/components';
import { normalizePages } from 'nextra/normalize-pages';

import type { PageMapItem } from 'nextra';

export interface SidebarProps {
  pageMap: PageMapItem[];
}

export const Sidebar = ({ pageMap }: SidebarProps) => {
  const pathname = usePathname();

  const { docsDirectories } = normalizePages({
    list: pageMap,
    route: pathname,
  });

  return pathname !== '/' ? (
    <nav
      style={{
        background: 'lightgreen',
        padding: 20,
      }}
    >
      <ul
        style={{
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          listStyleType: 'none',
          padding: 0,
          gap: 20,
        }}
      >
        {docsDirectories.map(function renderItem(item) {
          const route = item.route || ('href' in item ? (item.href as string) : '');
          const { title } = item;
          return (
            <li key={route} style={{ padding: '4px 4px 4px 10px', border: '1px solid' }}>
              {'children' in item ? (
                <details>
                  <summary>{title}</summary>
                  {item.children.map((child) => renderItem(child))}
                </details>
              ) : (
                <Anchor href={route} style={{ textDecoration: 'none' }}>
                  {title}
                </Anchor>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  ) : null;
};
