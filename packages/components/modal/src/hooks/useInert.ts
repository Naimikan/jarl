import { useEffect } from 'react';

export interface UseInertParams {
  isOpened: boolean;
  modalElement: HTMLElement | null;
}

export const useInert = ({ isOpened, modalElement }: UseInertParams) => {
  useEffect(() => {
    if (!(isOpened && modalElement)) {
      return;
    }

    const originalInertStates = new Map<Element, string | null>();
    const bodyChildren = Array.from(document.body.children);

    bodyChildren.forEach((element) => {
      if (!element.contains(modalElement)) {
        originalInertStates.set(element, element.getAttribute('inert'));
        element.setAttribute('inert', '');
      }
    });

    return () => {
      bodyChildren.forEach((element) => {
        if (!element.contains(modalElement)) {
          const originalInert = originalInertStates.get(element);

          if (originalInert !== undefined) {
            if (originalInert === null) {
              element.removeAttribute('inert');
            } else {
              element.setAttribute('inert', originalInert);
            }
          }
        }
      });
    };
  }, [isOpened, modalElement]);
};
