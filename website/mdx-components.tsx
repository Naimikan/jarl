import type { MDXComponents } from 'mdx/types';

import { Prose } from '@/components/ui/Prose';

// import { LiveEditor } from './_components/live-editor/dynamic';

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    wrapper: Prose,
    ...components,
    // customLiveCode: LiveEditor,
  };
};
