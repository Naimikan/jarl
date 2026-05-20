import { type RefObject, useEffect } from 'react';

import { getFocusableElements } from '@jarl/utils';

import { extractElementFromRef } from '../helpers/extractElementFromRef';
import { useLatest } from './useLatest';

export interface UseFocusTrapParams {
  disabled?: boolean;
  focusOnMount?: boolean;
  initialFocusedElement?: RefObject<HTMLElement | null> | HTMLElement | null;
  rootElement: RefObject<HTMLElement | null> | HTMLElement | null;
}

const isTabKeyPressed = (event: KeyboardEvent) => event.key === 'Tab' || event.code === 'Tab';

export const useFocusTrap = ({
  focusOnMount = true,
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

    const finalRootElement = extractElementFromRef(rootElement);

    if (!finalRootElement) {
      return;
    }

    finalRootElement.setAttribute('data-focus-trap', 'true');

    const getAllFocusableElements = () =>
      Array.from(getFocusableElements(finalRootElement)).filter(
        (element) => element.closest('[data-focus-trap]') === finalRootElement,
      );

    if (focusOnMountRef.current) {
      const initialElementToFocus = extractElementFromRef(initialFocusedElementRef.current);

      (initialElementToFocus ?? getAllFocusableElements()[0])?.focus();
    }

    const onTab = (event: KeyboardEvent) => {
      if (!isTabKeyPressed(event)) {
        return;
      }

      const allFocusableElementsByRootElement = getAllFocusableElements();

      let currentIndex = allFocusableElementsByRootElement.findIndex((focusableElement) =>
        focusableElement.isSameNode(document.activeElement),
      );

      if (currentIndex === -1) {
        return;
      }

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
      finalRootElement.removeAttribute('data-focus-trap');
    };
  }, [disabled, rootElement]);
};
