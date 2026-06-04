import { Layout } from './_components/layout';
import { METADATA, NAVIGATION, VIEWPORT } from './constants';

import type { ReactNode } from 'react';

import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: needed to avoid FOUC
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Layout pageMap={NAVIGATION}>{children}</Layout>
      </body>
    </html>
  );
}

export { METADATA as metadata, VIEWPORT as viewport };
