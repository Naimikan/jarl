import { type RefObject, useEffect } from 'react';

import { extractElementFromRef } from '../helpers/extractElementFromRef';

export type UseMutationObserverParams = {
  element: RefObject<HTMLElement | null> | HTMLElement | null;
  callback: MutationCallback;
  options?: MutationObserverInit;
};

export const useMutationObserver = ({ element, callback, options }: UseMutationObserverParams) => {
  useEffect(() => {
    const elementToUse = extractElementFromRef(element);

    if (!elementToUse) {
      return;
    }

    const observer = new MutationObserver(callback);

    observer.observe(elementToUse, options);

    return () => {
      observer.disconnect();
    };
  }, [callback, options, element]);
};
