import { useEffect } from 'react';

import { useLatest } from './useLatest';

export interface UseEscapeParams {
  callback: (event: KeyboardEvent) => void;
  capture?: boolean;
  disabled?: boolean;
}

const isEscapeKeyPressed = (event: KeyboardEvent) =>
  event.key === 'Escape' || event.code === 'Escape';

export const useEscape = ({ callback, disabled, capture = false }: UseEscapeParams) => {
  const onEscapeRef = useLatest(callback);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const escapeHandler = (event: KeyboardEvent) => {
      if (isEscapeKeyPressed(event)) {
        onEscapeRef.current(event);
      }
    };

    window.addEventListener('keydown', escapeHandler, capture);

    return () => {
      window.removeEventListener('keydown', escapeHandler, capture);
    };
  }, [disabled, capture]);
};
