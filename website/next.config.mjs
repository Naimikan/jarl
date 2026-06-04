import createMdx from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { remarkMdxToc } from 'remark-mdx-toc';

import remarkCustomLiveCode from './bin/remark-custom-live-code.mjs';

const isProduction = process.env.NODE_ENV === 'production';

const withMdx = createMdx({
  options: {
    remarkPlugins: [remarkMdxToc, remarkCustomLiveCode],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          test: ['h2', 'h3', 'h4', 'h5', 'h6'],
          behavior: 'append',
          properties: {
            className: ['anchor'],
            ariaLabel: 'Link to section',
          },
          content: {
            type: 'element',
            tagName: 'span',
            properties: {},
            children: [{ type: 'text', value: '#' }],
          },
        },
      ],
      [rehypePrettyCode, { theme: { dark: 'github-dark', light: 'github-light' } }],
    ],
  },
});

export default withMdx({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  output: 'export',
  basePath: isProduction ? '/jarl' : '',
  assetPrefix: isProduction ? '/jarl' : '',
  trailingSlash: true,
  images: { unoptimized: true },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});

// const withNextra = nextra({
//   defaultShowCopyCode: true,
//   search: { codeblocks: false },
//   mdxOptions: {
//     remarkPlugins: [remarkCustomLiveCode],
//   },
// });

// export default withNextra({
//   reactStrictMode: true,
//   output: 'export',
//   basePath: isProduction ? '/jarl' : '',
//   assetPrefix: isProduction ? '/jarl' : '',
//   trailingSlash: true,
//   images: {
//     unoptimized: true,
//   },
//   webpack(config) {
//     config.resolve.alias['next-mdx-import-source-file'] = path.resolve(
//       process.cwd(),
//       './app/mdx-components.tsx',
//     );

//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     });

//     return config;
//   },
// });
