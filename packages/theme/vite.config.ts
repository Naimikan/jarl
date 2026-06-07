import { generateCssVars } from '@jarl/utils';
import { createLibConfig } from '@jarl/vite-config';

import { colors } from './src/tokens';

import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve(__dirname, './dist');

const buildCssFiles = () => {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  const colorsCssVars = generateCssVars({ tokensObj: colors, prefix: '--jarl-colors' });

  const tokensCss = `:root {\n${colorsCssVars}}\n`;
  fs.writeFileSync(path.join(DIST_DIR, 'tokens.css'), tokensCss, 'utf8');

  let componentsCss = '';

  const componentsFolder = fs.readdirSync('./src/components', {
    encoding: 'utf-8',
    withFileTypes: true,
  });

  componentsFolder.forEach((each) => {
    const stylesRoute = `${each.parentPath}/${each.name}/styles.css`;

    if (fs.existsSync(stylesRoute)) {
      const componentCss = fs.readFileSync(`${each.parentPath}/${each.name}/styles.css`, 'utf-8');

      componentsCss += `${componentCss}`;
    }
  });

  fs.writeFileSync(path.join(DIST_DIR, 'index.css'), `${tokensCss}${componentsCss}`, 'utf8');
};

export default createLibConfig({
  plugins: [
    {
      name: 'jarl-css-generator',
      closeBundle() {
        buildCssFiles();
      },
    },
  ],
});
