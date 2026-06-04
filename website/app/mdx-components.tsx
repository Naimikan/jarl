import { Content } from './_components/layout/content';

import type { MDXComponents } from 'mdx/types';

// import { LiveEditor } from './_components/live-editor/dynamic';

export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    wrapper: Content,
    ...components,
    // customLiveCode: LiveEditor,
  };
};
