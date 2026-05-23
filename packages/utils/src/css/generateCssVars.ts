import { isDefinedAndNotNull } from '../assert/isDefinedAndNotNull';

export type TokenObject = {
  [key: string]: string | number | TokenObject;
};

export interface GenerateCssVarsParams {
  prefix: string;
  tokensObj: TokenObject;
}

export const generateCssVars = ({ tokensObj, prefix }: GenerateCssVarsParams) => {
  let cssTokens = '';

  const basePrefix = prefix.startsWith('--') ? prefix : `--${prefix}`;

  for (const key in tokensObj) {
    if (Object.hasOwn(tokensObj, key)) {
      const tokenValue = tokensObj[key];

      if (tokenValue && typeof tokenValue === 'object') {
        cssTokens += generateCssVars({ tokensObj: tokenValue, prefix: `${basePrefix}-${key}` });
      } else if (isDefinedAndNotNull(tokenValue)) {
        cssTokens += `${basePrefix}-${key}: ${tokenValue};\n`;
      }
    }
  }

  return cssTokens;
};
