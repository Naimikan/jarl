import { useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import { isDefined } from '@jarl/utils';

import { createElementWithProps } from './helpers/createElementWithProps';
import { useParentElement } from './hooks/useParentElement';
import { useSyncElementProps } from './hooks/useSyncElementProps';
import { PortalContext } from './Portal.context';

import type { PortalProps } from './Portal.types';

export const Portal = ({ appendTo, children, ref, ...props }: PortalProps) => {
  const parentElementInContext = useParentElement(appendTo);
  const portalElementRef = useRef<HTMLElement | null>(null);

  if (isDefined(document) && !portalElementRef.current) {
    portalElementRef.current = createElementWithProps(props);
  }

  useSyncElementProps({ element: portalElementRef.current, props });

  useEffect(() => {
    if (!portalElementRef.current) {
      return;
    }

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

  return portalElementRef.current
    ? createPortal(
        <PortalContext.Provider value={portalElementRef.current}>
          {children}
        </PortalContext.Provider>,
        portalElementRef.current,
      )
    : null;
};

Portal.displayName = 'Jarl.Portal';
