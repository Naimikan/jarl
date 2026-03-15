import { createContext, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import { createElementWithProps } from './helpers/createElementWithProps';

import type { AppendTo, PortalProps } from './Portal.types';

export const PortalContext = createContext<HTMLElement>(document.body);

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

export const Portal = ({ appendTo, children, ref, ...props }: PortalProps) => {
  const parentElementInContext = useParentElement(appendTo);
  const portalElementRef = useRef<HTMLElement>(createElementWithProps(props));

  useEffect(() => {
    const portalElement = portalElementRef.current;

    if (parentElementInContext) {
      if (!portalElement.parentElement) {
        parentElementInContext.appendChild(portalElement);
      }
    }

    return () => {
      if (portalElement.parentElement === parentElementInContext) {
        parentElementInContext?.removeChild(portalElement);
      }
    };
  }, [parentElementInContext]);

  useImperativeHandle(ref, () => portalElementRef.current as HTMLDivElement);

  return createPortal(
    <PortalContext.Provider value={portalElementRef.current}>{children}</PortalContext.Provider>,
    portalElementRef.current,
  );
};

Portal.displayName = 'Portal';
