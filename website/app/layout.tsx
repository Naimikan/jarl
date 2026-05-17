import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Layout as NextraLayout } from 'nextra-theme-docs';

import { Footer } from './_components/footer';
import { Navbar } from './_components/navbar';
import { METADATA, REPOSITORY_URL } from './constants';

import type { ReactNode } from 'react';

import 'nextra-theme-docs/style.css';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <NextraLayout
          docsRepositoryBase={`${REPOSITORY_URL}/tree/main/website`}
          footer={<Footer />}
          navbar={<Navbar />}
          pageMap={await getPageMap()}
        >
          {children}
        </NextraLayout>
      </body>
    </html>
  );
}

export { METADATA as metadata };
