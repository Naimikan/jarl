import nextra from 'nextra';
import { visit } from 'unist-util-visit';

import path from 'node:path';

const isProduction = process.env.NODE_ENV === 'production';

const booleanAttribute = (name, value) => ({
  type: 'mdxJsxAttribute',
  name,
  value: {
    type: 'mdxJsxAttributeValueExpression',
    value: String(value),
    data: {
      estree: {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: { type: 'Literal', value, raw: String(value) },
          },
        ],
      },
    },
  },
});

const parseMetaString = (meta) => {
  const result = {};
  const regex = /(\w+)(?:="([^"]*)")?/g;

  for (const match of meta.matchAll(regex)) {
    const [, key, value] = match;
    if (value === undefined || value === 'true') {
      result[key] = true;
    } else if (value === 'false') {
      result[key] = false;
    } else {
      result[key] = value;
    }
  }

  return result;
};

const remarkCustomLiveCode = () => (tree) => {
  visit(tree, 'code', (node, index, parent) => {
    const parsedMeta = parseMetaString(node.meta || '');

    console.log({ parsedMeta });

    if (parsedMeta.live) {
      const attributes = [{ type: 'mdxJsxAttribute', name: 'language', value: node.lang }];

      if (parsedMeta.filename) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'filename', value: parsedMeta.filename });
      }

      if (parsedMeta.copyButton) {
        attributes.push(booleanAttribute('copyButton', parsedMeta.copyButton));
      }

      if (parsedMeta.inline) {
        attributes.push(booleanAttribute('inline', parsedMeta.inline));
      }

      parent.children.splice(index, 1, {
        type: 'mdxJsxFlowElement',
        name: 'customLiveCode',
        attributes,
        children: [{ type: 'mdxJsxAttribute', name: 'children', value: node.value }],
      });
    }
  });
};

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
  transpilePackages: ['@jarl/button', '@jarl/styled-system'],
  images: {
    unoptimized: true,
  },
  webpack(config) {
    // Equivalente a resolveAlias de Turbopack
    config.resolve.alias['next-mdx-import-source-file'] = path.resolve(
      process.cwd(),
      './app/mdx-components.tsx',
    );

    // Equivalente a la regla SVG con @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
