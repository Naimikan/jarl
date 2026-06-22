import type { MouseEvent, TouchEvent } from 'react';

export const isLeftMouseClickEvent = (event: MouseEvent | TouchEvent): boolean =>
  'button' in event && event.button === 0;
