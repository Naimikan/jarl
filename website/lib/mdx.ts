import { notFound } from 'next/navigation';

import type { Heading } from '@/components/layout/TableOfContents';

export async function getDocBySlug(slug: string) {
  try {
    const mod = await import(`@/content/docs/${slug}/page.mdx`);

    return {
      // biome-ignore lint/style/useNamingConvention: Content is a react element
      Content: mod.default as React.ComponentType,
      toc: (mod.toc ?? []) as Heading[],
    };
  } catch {
    notFound();
  }
}
