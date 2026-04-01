import { defineKeyframes, defineSlotRecipe } from '@pandacss/dev';

export const modal = defineSlotRecipe({
  className: 'jarl-modal',
  slots: ['root', 'content', 'backdrop'],
  base: {
    root: {
      display: 'flex',
      inset: '0px auto auto 0px',
      height: '100dvh',
      position: 'fixed',
      whiteSpace: 'nowrap',
      willChange: 'opacity',
      width: '100dvw',
      zIndex: 100,

      '&[data-state="closed"]': {
        opacity: 0,
      },

      '&[data-state="opened"]': {
        opacity: 1,
      },

      '&[data-state="opening"]': {
        animation: '300ms fadeInAnimation backwards',
      },

      '&[data-state="closing"]': {
        animation: '300ms fadeOutAnimation forwards',
      },

      '&[data-align="start"]': {
        alignItems: 'start',
      },

      '&[data-align="center"]': {
        alignItems: 'center',
      },

      '&[data-align="end"]': {
        alignItems: 'end',
      },

      '&[data-justify="start"]': {
        justifyContent: 'start',
      },

      '&[data-justify="center"]': {
        justifyContent: 'center',
      },

      '&[data-justify="end"]': {
        justifyContent: 'end',
      },
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      position: 'fixed',
      width: '100dvw',
      height: '100dvh',
      left: 0,
      top: 0,

      '&[data-state="closed"]': {
        opacity: 0,
      },

      '&[data-state="opened"]': {
        opacity: 1,
      },

      '&[data-state="opening"]': {
        animation: '300ms fadeInAnimation backwards',
      },

      '&[data-state="closing"]': {
        animation: '300ms fadeOutAnimation forwards',
      },
    },
    content: {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      margin: '24px',
      padding: '12px',
      position: 'relative',
    },
  },
});

export const modalKeyframes = defineKeyframes({
  fadeInAnimation: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOutAnimation: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
});
