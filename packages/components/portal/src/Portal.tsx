import { useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import { createElementWithProps } from './helpers/createElementWithProps';
import { useParentElement } from './hooks/useParentElement';
import { useSyncElementProps } from './hooks/useSyncElementProps';
import { PortalContext } from './Portal.context';

import type { PortalProps } from './Portal.types';

export const Portal = ({ appendTo, children, ref, ...props }: PortalProps) => {
  const parentElementInContext = useParentElement(appendTo);
  const portalElementRef = useRef<HTMLElement>(createElementWithProps(props));

  useSyncElementProps({ element: portalElementRef.current, props });

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

Portal.displayName = 'Jarl.Portal';
