import { defineKeyframes, defineSlotRecipe } from '@pandacss/dev';

import {
  getBottomArrowStyles,
  getBottomLeftArrowStyles,
  getBottomRightArrowStyles,
  getLeftArrowStyles,
  getLeftBottomArrowStyles,
  getLeftTopArrowStyles,
  getRightArrowStyles,
  getRightBottomArrowStyles,
  getRightTopArrowStyles,
  getTopArrowStyles,
  getTopLeftArrowStyles,
  getTopRightArrowStyles,
} from './helpers';

export const anchoredElement = defineSlotRecipe({
  className: 'jarl-anchored-element',
  slots: ['root', 'content', 'arrow'],
  base: {
    root: {
      inset: '0px auto auto 0px',
      left: 0,
      position: 'absolute',
      top: 0,
      whiteSpace: 'nowrap',
      zIndex: 100,
    },
    content: {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '8px',
      position: 'relative',
      opacity: '0',
      willChange: 'transform, visibility',

      '&[data-state="closed"]': {
        opacity: '0',
      },
      '&[data-state="opened"]': {
        opacity: '1',
      },
      '&[data-state="opening"]': {
        animation: '300ms fadeInAnimation',
      },
      '&[data-state="closing"]': {
        animation: '300ms fadeOutAnimation',
      },
    },
    arrow: {
      backgroundColor: '#fff',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      position: 'absolute',
      transform: 'rotate(45deg)',
      height: '10px',
      width: '10px',

      '&[data-position="top"]': getTopArrowStyles(),
      '&[data-position="top_left"]': getTopLeftArrowStyles(),
      '&[data-position="top_right"]': getTopRightArrowStyles(),
      '&[data-position="bottom"]': getBottomArrowStyles(),
      '&[data-position="bottom_left"]': getBottomLeftArrowStyles(),
      '&[data-position="bottom_right"]': getBottomRightArrowStyles(),
      '&[data-position="left"]': getLeftArrowStyles(),
      '&[data-position="left_top"]': getLeftTopArrowStyles(),
      '&[data-position="left_bottom"]': getLeftBottomArrowStyles(),
      '&[data-position="right"]': getRightArrowStyles(),
      '&[data-position="right_top"]': getRightTopArrowStyles(),
      '&[data-position="right_bottom"]': getRightBottomArrowStyles(),
    },
  },
});

export const anchoredElementKeyframes = defineKeyframes({
  fadeInAnimation: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOutAnimation: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
});
