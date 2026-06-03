import type { Metadata } from 'next';

export const OWNER_URL = 'https://github.com/Naimikan';
export const REPOSITORY_URL = 'https://github.com/Naimikan/jarl';

export const METADATA: Metadata = {
  title: {
    template: 'Jarl | %s',
    default: 'Jarl - Just another react libray',
  },
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  description: 'JARL - Just another react library',
  creator: 'Naimikan',
};

export interface NavigationItem {
  href: string;
  title: string;
}

export interface NavigationSection {
  items: NavigationItem[];
  label: string;
  type: 'separator';
}

export const NAVIGATION: NavigationSection[] = [
  {
    label: 'Get Started',
    type: 'separator',
    items: [
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Theme', href: '/docs/theme' },
    ],
  },
  {
    label: 'Components',
    type: 'separator',
    items: [
      { title: 'Anchored Element', href: '/docs/components/anchored-element' },
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Checkbox', href: '/docs/components/checkbox' },
      { title: 'Input', href: '/docs/components/input' },
      { title: 'Modal', href: '/docs/components/modal' },
    ],
  },
];
