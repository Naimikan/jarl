import { useEffect } from 'react';

import { useLatest } from './useLatest';

export interface UseClickOutsideParams {
  callback: (event: MouseEvent | TouchEvent) => void;
  disabled?: boolean;
  rootElement: string | HTMLElement | null;
}

export const useClickOutside = ({ callback, disabled, rootElement }: UseClickOutsideParams) => {
  const onClickOutsideRef = useLatest(callback);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const finalRootElement =
      rootElement && typeof rootElement === 'string'
        ? document.getElementById(rootElement)
        : (rootElement as HTMLElement | null);

    const clickOutsideHandler = (event: MouseEvent | TouchEvent) => {
      if (
        finalRootElement &&
        event.target instanceof Node &&
        !finalRootElement.contains(event.target)
      ) {
        onClickOutsideRef.current(event);
      }
    };

    window.addEventListener('mousedown', clickOutsideHandler);
    window.addEventListener('touchstart', clickOutsideHandler);

    return () => {
      window.removeEventListener('mousedown', clickOutsideHandler);
      window.removeEventListener('touchstart', clickOutsideHandler);
    };
  }, [disabled, rootElement]);
};
