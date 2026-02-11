import { defineRecipe } from '@pandacss/dev';

export const button = defineRecipe({
  className: 'jarl-button',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    flex: '0 0 auto',
    justifyContent: 'center',
    gap: '2',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',

    _disabled: {
      cursor: 'not-allowed',
    },

    _hover: {
      textDecoration: 'none',
    },

    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'black',
      outlineOffset: '2px',
    },
  },
});
