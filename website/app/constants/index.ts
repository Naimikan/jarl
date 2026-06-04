import { colors } from '@jarl/theme';

import type { Metadata, Viewport } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

export const OWNER_URL = 'https://github.com/Naimikan';
export const REPOSITORY_URL = 'https://github.com/Naimikan/jarl';

export const METADATA: Metadata = {
  title: {
    template: 'Jarl | %s',
    default: 'Jarl - Just another react library',
  },
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  description:
    'Jarl is a headless React component library focused on accessibility and flexibility. Build your own UI with unstyled, composable primitives.',
  creator: 'Naimikan',
  authors: [{ name: 'Naimikan' }],
  keywords: [
    'react',
    'headless',
    'components',
    'component library',
    'headless ui',
    'accessible components',
    'react library',
    'unstyled components',
  ],
  openGraph: {
    type: 'website',
    url: 'https://naimikan.github.io/jarl',
    title: 'Jarl - Just another react library',
    description: 'A headless React component library focused on accessibility and flexibility.',
    siteName: 'Jarl',
    images: [
      {
        url: isProduction ? 'https://naimikan.github.io/jarl/jarl.png' : '/jarl.png',
        width: 630,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Jarl - Just another react library',
    description: 'A headless React component library focused on accessibility and flexibility.',
    images: [
      isProduction ? 'https://naimikan.github.io/jarl/favicon-96x96.png' : '/favicon-96x96.png',
    ],
  },
  manifest: isProduction ? 'https://naimikan.github.io/jarl/site.webmanifest' : '/site.webmanifest',
  alternates: {
    canonical: 'https://naimikan.github.io/jarl',
  },
  icons: {
    icon: [
      {
        url: isProduction
          ? 'https://naimikan.github.io/jarl/favicon-96x96.png'
          : '/favicon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        url: isProduction ? 'https://naimikan.github.io/jarl/favicon.svg' : '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: {
      url: isProduction ? 'https://naimikan.github.io/jarl/favicon.ico' : '/favicon.ico',
    },
    apple: [
      {
        url: isProduction
          ? 'https://naimikan.github.io/jarl/apple-touch-icon.png'
          : '/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
  },
  metadataBase: new URL(isProduction ? 'https://naimikan.github.io/jarl' : 'http://localhost:3000'),
  robots: {
    index: true,
    follow: true,
  },
};

export const VIEWPORT: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: colors.white },
    { media: '(prefers-color-scheme: dark)', color: colors.black },
  ],
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
