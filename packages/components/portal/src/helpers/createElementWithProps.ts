import { getEventName } from './getEventName';
import { isEventHandler } from './isEventHandler';

import type { PortalProps } from '../Portal.types';

export const createElementWithProps = (
  props: Omit<PortalProps, 'appendTo' | 'ref' | 'children' | 'key'>,
): HTMLElement => {
  const element = document.createElement('div');

  Object.entries(props).forEach(([propName, value]) => {
    if (value !== undefined) {
      if (isEventHandler(propName) && typeof value === 'function') {
        const eventName = getEventName(propName);
        element.addEventListener(eventName, value as EventListener);
      } else if (propName === 'style' && typeof value === 'object') {
        element.style = Object.entries(value).reduce(
          (acc, [attribute, cssValue]) => `${acc}${attribute}:${cssValue};`,
          '',
        );
      } else if (propName === 'className') {
        element.className = value as string;
      } else if (['string', 'number', 'boolean'].includes(typeof value)) {
        element.setAttribute(propName, value.toString());
      }
    }
  });

  return element;
};
