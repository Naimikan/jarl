import { isDefinedAndNotNull } from '@jarl/utils';

import type { NoReservedPortalProps } from '../types/Portal.types';
import { getEventName } from './getEventName';
import { isEventHandler } from './isEventHandler';

export const createElementWithProps = (props: NoReservedPortalProps): HTMLElement => {
  const element = document.createElement('div');

  Object.entries(props).forEach(([propName, value]) => {
    if (isDefinedAndNotNull(value)) {
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
