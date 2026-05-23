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

  const lightCssContent = fs.readFileSync(
    path.resolve(__dirname, './src/partials/light.css'),
    'utf8',
  );
  fs.writeFileSync(path.join(DIST_DIR, 'light-only.css'), `${tokensCss}${lightCssContent}`, 'utf8');

  const darkCss = fs.readFileSync(path.resolve(__dirname, './src/partials/dark.css'), 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, 'dark-only.css'), `${tokensCss}${darkCss}`, 'utf8');

  const prefersColorSchemeCss = fs.readFileSync(
    path.resolve(__dirname, './src/partials/prefersColorScheme.css'),
    'utf8',
  );
  fs.writeFileSync(
    path.join(DIST_DIR, 'index.css'),
    `${tokensCss}${lightCssContent}${prefersColorSchemeCss}${darkCss}`,
    'utf8',
  );
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
