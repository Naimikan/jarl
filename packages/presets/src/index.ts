import { anchoredElement, anchoredElementKeyframes } from './anchored-element';
import { button } from './button';

import type { CssKeyframes } from '@pandacss/dev';

export const recipes = {
  anchoredElement,
  button,
};

export const keyframes: CssKeyframes = {
  ...anchoredElementKeyframes,
};
