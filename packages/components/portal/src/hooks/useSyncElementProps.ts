import { useEffect, useRef } from 'react';

import { getEventName } from '../helpers/getEventName';
import { isEventHandler } from '../helpers/isEventHandler';

import type { NoReservedPortalProps } from '../Portal.types';

export interface UseSyncElementPropsParams {
  element: HTMLElement;
  props: NoReservedPortalProps;
}

export const useSyncElementProps = ({ element, props }: UseSyncElementPropsParams) => {
  const listenersRef = useRef<Record<string, EventListener>>({});

  useEffect(() => {
    const currentListeners = listenersRef.current;

    Object.entries(props).forEach(([propName, value]) => {
      if (!isEventHandler(propName)) {
        if (!value) {
          if (propName === 'className') {
            element.className = '';
          } else {
            element.removeAttribute(propName);
          }
        } else if (propName === 'style' && typeof value === 'object') {
          element.style.cssText = Object.entries(value).reduce(
            (acc, [attribute, cssValue]) => `${acc}${attribute}:${cssValue};`,
            '',
          );
        } else if (propName === 'className') {
          element.className = value as string;
        } else if (['string', 'number', 'boolean'].includes(typeof value)) {
          element.setAttribute(propName, value.toString());
        }
      } else {
        const eventName = getEventName(propName);
        const listenerByName = currentListeners[eventName];

        if (listenerByName && listenerByName !== value) {
          element.removeEventListener(eventName, listenerByName);
        }

        if (typeof value === 'function' && value !== listenerByName) {
          element.addEventListener(eventName, value as EventListener);
          currentListeners[eventName] = value as EventListener;
        }
      }
    });

    Object.keys(currentListeners).forEach((eventName) => {
      const callbackHandlerName = `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;

      if (
        !Object.keys(props).some((propName) => propName !== callbackHandlerName) &&
        currentListeners[eventName]
      ) {
        element.removeEventListener(eventName, currentListeners[eventName]);
        delete currentListeners[eventName];
      }
    });
  });

  useEffect(() => () => {
    Object.entries(listenersRef.current).forEach(([eventName, listener]) => {
      element.removeEventListener(eventName, listener);
    });
  });
};
