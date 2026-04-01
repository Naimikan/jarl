import { anchoredElement, anchoredElementKeyframes } from './anchored-element';
import { button } from './button';
import { modal, modalKeyframes } from './modal';

import type { CssKeyframes } from '@pandacss/dev';

export const recipes = {
  anchoredElement,
  button,
  modal,
};

export const keyframes: CssKeyframes = {
  ...anchoredElementKeyframes,
  ...modalKeyframes,
};
