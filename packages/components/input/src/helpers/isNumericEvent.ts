import type { KeyboardEvent } from 'react';

import { isNumericChar } from './isNumericChar';

const SIGN_CHARS = ['+', '-'];

const isValidSignPosition = (target: HTMLInputElement): boolean => {
  const { value, selectionStart } = target;
  const isCursorAtStart = selectionStart === null ? false : selectionStart === 0;

  if (isCursorAtStart) {
    return !/[+-]/.test(value);
  }

  const charBeforeCursor = selectionStart !== null ? value.charAt(selectionStart - 1) : '';

  return charBeforeCursor === 'e' || charBeforeCursor === 'E';
};

const isValidDecimalPosition = (target: HTMLInputElement): boolean => {
  const { value, selectionStart } = target;
  const isCursorAtStart = selectionStart === null ? false : selectionStart === 0;

  if (isCursorAtStart || value.includes('.') || value.includes('e') || value.includes('E')) {
    return false;
  }

  return true;
};

export const isNumericEvent = (event: KeyboardEvent<HTMLInputElement>) => {
  const { key: keyPressed, ctrlKey, altKey, metaKey } = event;
  const eventTarget = event.target as HTMLInputElement;

  if (ctrlKey || altKey || metaKey) {
    return true;
  }

  const isNavigationKey = keyPressed.length > 1;

  if (isNavigationKey) {
    return true;
  }

  if (!isNumericChar(keyPressed)) {
    return false;
  }

  if (SIGN_CHARS.includes(keyPressed)) {
    return isValidSignPosition(eventTarget);
  }

  if (keyPressed === '.') {
    return isValidDecimalPosition(eventTarget);
  }

  return true;
};
