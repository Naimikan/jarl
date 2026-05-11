import { anchoredElement, anchoredElementKeyframes } from './anchored-element';
import { modal, modalKeyframes } from './modal';

import type { CssKeyframes } from '@pandacss/dev';

export const recipes = {
  anchoredElement,
  modal,
};

export const keyframes: CssKeyframes = {
  ...anchoredElementKeyframes,
  ...modalKeyframes,
};
