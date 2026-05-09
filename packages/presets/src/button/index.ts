import { defineRecipe } from '@pandacss/dev';

export const button = defineRecipe({
  className: 'jarl-button',
  base: {
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '4px',
    padding: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
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
