import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';

import { LiveEditor } from './_components/live-editor';

const themeComponents = getThemeComponents();

export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
    customLiveCode: LiveEditor,
  };
}
