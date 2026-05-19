import type { RefObject } from 'react';

export const extractElementFromRef = (
  value: RefObject<HTMLElement | null> | HTMLElement | null | undefined,
) => (value && 'current' in value ? value.current : value);
