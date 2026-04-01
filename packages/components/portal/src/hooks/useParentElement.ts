import { useContext } from 'react';

import { PortalContext } from '../Portal.context';

import type { AppendTo } from '../Portal.types';

export const useParentElement = (appendTo?: AppendTo): HTMLElement | null => {
  const parentElementInContext = useContext(PortalContext);

  if (appendTo) {
    if (typeof appendTo === 'string') {
      return document.querySelector(appendTo);
    }

    if (typeof appendTo === 'function') {
      return appendTo();
    }

    return appendTo;
  }

  return parentElementInContext;
};
