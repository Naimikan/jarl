import { useMDXComponents as getNextraComponents } from 'nextra/mdx-components';

import { TableOfContents } from './_components/table-of-contents';

// import { LiveEditor } from './_components/live-editor/dynamic';

const defaultComponents = getNextraComponents({
  wrapper({ children, toc }) {
    return (
      <>
        <main style={{ flexGrow: 1, padding: 20 }}>{children}</main>
        <TableOfContents contents={toc} />
      </>
    );
  },
});

export function useMDXComponents(components) {
  return {
    ...defaultComponents,
    ...components,
    // customLiveCode: LiveEditor,
  };
}
