import nextra from 'nextra';

import remarkCustomLiveCode from './bin/remark-custom-live-code.mjs';

import path from 'node:path';

const isProduction = process.env.NODE_ENV === 'production';

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: { codeblocks: false },
  mdxOptions: {
    remarkPlugins: [remarkCustomLiveCode],
  },
});

export default withNextra({
  reactStrictMode: true,
  output: 'export',
  basePath: isProduction ? '/jarl' : '',
  assetPrefix: isProduction ? '/jarl' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.resolve.alias['next-mdx-import-source-file'] = path.resolve(
      process.cwd(),
      './app/mdx-components.tsx',
    );

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
