import { useEffect } from 'react';

import { getFocusableElements } from '@jarl/utils';

import { useLatest } from './useLatest';

export interface UseFocusTrapParams {
  disabled?: boolean;
  focusOnMount?: boolean;
  initialFocusedElement?: string | HTMLElement | null;
  rootElement: string | HTMLElement | null;
}

const isTabKeyPressed = (event: KeyboardEvent) => event.key === 'Tab' || event.code === 'Tab';

export const useFocusTrap = ({
  focusOnMount,
  initialFocusedElement,
  disabled,
  rootElement,
}: UseFocusTrapParams) => {
  const focusOnMountRef = useLatest(focusOnMount);
  const initialFocusedElementRef = useLatest(initialFocusedElement);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const finalRootElement =
      rootElement && typeof rootElement === 'string'
        ? document.getElementById(rootElement)
        : (rootElement as HTMLElement | null);

    if (!finalRootElement) {
      return;
    }

    const getAllFocusableElements = () => Array.from(getFocusableElements(finalRootElement));

    if (focusOnMountRef.current) {
      const finalInitialFocusedElement =
        typeof initialFocusedElementRef.current === 'string'
          ? document.getElementById(initialFocusedElementRef.current)
          : (initialFocusedElementRef.current as HTMLElement | null);

      (finalInitialFocusedElement ?? getAllFocusableElements()[0])?.focus();
    }

    const onTab = (event: KeyboardEvent) => {
      if (!isTabKeyPressed(event)) {
        return;
      }

      const allFocusableElementsByRootElement = getAllFocusableElements();

      let currentIndex = allFocusableElementsByRootElement.findIndex((focusableElement) =>
        focusableElement.isSameNode(document.activeElement),
      );

      currentIndex += event.shiftKey ? -1 : 1;

      if (currentIndex < 0) {
        currentIndex = allFocusableElementsByRootElement.length - 1;
      } else if (currentIndex > allFocusableElementsByRootElement.length - 1) {
        currentIndex = 0;
      }

      allFocusableElementsByRootElement[currentIndex]?.focus();
      event.preventDefault();
    };

    finalRootElement.addEventListener('keydown', onTab);

    return () => {
      finalRootElement.removeEventListener('keydown', onTab);
    };
  }, [disabled, rootElement]);
};
