import { notFound, redirect } from 'next/navigation';

import { TableOfContents } from '@/components/layout/TableOfContents';
import { NAVIGATION } from '@/constants';
import { getDocBySlug } from '@/lib/mdx';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export const generateStaticParams = () =>
  NAVIGATION.flatMap((section) => section.items).map((item) => ({
    slug: item.href.replace('/docs/', '').split('/'),
  }));

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    const defaultRedirectUrl = NAVIGATION.find((each) => each.label === 'Get Started')?.items[0]
      .href;

    redirect(defaultRedirectUrl ?? '/');
  }

  const path = slug.join('/');

  const { Content, toc } = await getDocBySlug(path);

  if (!Content) {
    notFound();
  }

  return (
    <>
      <Content />
      <TableOfContents contents={toc} />
    </>
  );
}
