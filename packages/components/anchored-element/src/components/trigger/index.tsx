import { cloneElement } from 'react';

import { ANIMATION_STATES } from '../../constants/animationStates';
import { TRIGGER_EVENTS } from '../../constants/triggerEvents';
import { useAnchoredContext } from '../../hooks/useAnchoredContext';
import { useTriggerListeners } from './hooks/useAnchorTriggerListeners';
import { Wrapper } from './wrapper';

import type { ElementWithRef } from '../../AnchoredElement.types';
import type { AnchorTriggerProps, CloneAnchorTrigger } from './index.types';

export const AnchorTrigger = ({ children }: AnchorTriggerProps) => {
  const context = useAnchoredContext();
  const { id, contentId, triggerId, wrapTrigger, animationState, triggerEvents } = context;

  useTriggerListeners();

  let triggerElement = children;

  if (wrapTrigger) {
    triggerElement = <Wrapper>{children}</Wrapper>;
  }

  return cloneElement(triggerElement, {
    ref: (node) => {
      context.triggerElement = node;

      const originalRef = (children as ElementWithRef).ref;
      if (typeof originalRef === 'function') {
        originalRef(node);
      } else if (originalRef) {
        originalRef.current = node;
      }
    },
    id: triggerId,
    tabIndex: triggerEvents.some((eachTrigger) => eachTrigger === TRIGGER_EVENTS.FOCUS)
      ? 0
      : undefined,
    'data-anchored-element': id,
    ...(animationState === ANIMATION_STATES.OPENED ? { 'aria-describedby': contentId } : {}),
  } as CloneAnchorTrigger);
};

AnchorTrigger.displayName = 'Jarl.AnchoredElement.AnchorTrigger';
