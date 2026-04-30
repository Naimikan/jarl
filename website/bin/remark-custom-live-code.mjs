import { visit } from 'unist-util-visit';

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

export default remarkCustomLiveCode;
