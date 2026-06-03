import { notFound } from 'next/navigation';

import { type Heading, TableOfContents } from '../../_components/table-of-contents';
import { NAVIGATION } from '../../constants';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export const generateStaticParams = () =>
  NAVIGATION.flatMap((section) => section.items).map((item) => ({
    slug: item.href.replace('/docs/', '').split('/'),
  }));

export default async function DocPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const path = slug.length > 0 ? slug.join('/') : 'index';

  console.log(path);

  let Content: React.ComponentType;
  let toc: Heading[] = [];

  try {
    const mod = await import(`../_content/${path}/page.mdx`);
    Content = mod.default;
    toc = mod.toc ?? [];
  } catch {
    notFound();
  }

  return (
    <>
      <Content />
      <TableOfContents contents={toc} />
    </>
  );
}
