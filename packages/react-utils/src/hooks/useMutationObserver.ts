import { useEffect } from 'react';

export type UseMutationObserverParams = {
  element: HTMLElement | null;
  callback: MutationCallback;
  options?: MutationObserverInit;
};

export const useMutationObserver = ({ element, callback, options }: UseMutationObserverParams) => {
  useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new MutationObserver(callback);

    observer.observe(element, options);

    return () => {
      observer.disconnect();
    };
  }, [callback, options, element]);
};
