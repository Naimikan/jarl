import { defineConfig } from '@pandacss/dev';

import { keyframes, recipes } from '@jarl/presets';

export default defineConfig({
  include: [
    '../../apps/*/src/**/*.{ts,tsx,js,jsx,mdx}',
    '../../packages/components/*/src/**/*.{ts,tsx,js,jsx}',
    '../../packages/presets/src/**/*.{ts,tsx,js,jsx}',
  ],

  exclude: [
    '**/node_modules/**',
    '**/.next/**',
    '**/.turbo/**',
    '**/dist/**',
    '**/playground/storybook-static/**',
  ],

  outdir: 'dist',
  outExtension: 'mjs',

  theme: {
    extend: {
      recipes,
      keyframes,
    },
  },

  staticCss: {
    recipes: Object.keys(recipes).reduce(
      (acc, recipeName) => Object.assign(acc, { [recipeName]: ['*'] }),
      {},
    ) as { [key: string]: ['*'] },
  },

  jsxFramework: 'react',
});
