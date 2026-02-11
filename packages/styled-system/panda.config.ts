import { recipes } from '@jarl/presets';
import { defineConfig } from '@pandacss/dev';

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
    },
  },

  staticCss: {
    recipes: Object.keys(recipes).reduce(
      (acc, recipeName) => Object.assign(acc, { [recipeName]: ['*'] }),
      {}
    ) as { [key: string]: ['*'] },
  },

  jsxFramework: 'react',
});
