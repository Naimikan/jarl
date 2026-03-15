import { cloneElement } from 'react';

import { ANIMATION_STATES } from '../../constants/animationStates';
import { useAnchoredContext } from '../../hooks/useAnchoredContext';
import { useTriggerListeners } from './hooks/useAnchorTriggerListeners';
import { Wrapper } from './wrapper';

import type { ElementWithRef } from '../../AnchoredElement.types';
import type { AnchorTriggerProps, CloneAnchorTrigger } from './index.types';

export const AnchorTrigger = ({ children }: AnchorTriggerProps) => {
  const context = useAnchoredContext();
  const { id, contentId, triggerId, wrapTrigger, animationState } = context;

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
    'data-anchored-element': id,
    ...(animationState === ANIMATION_STATES.OPENED ? { 'aria-describedby': contentId } : {}),
  } as CloneAnchorTrigger);
};

AnchorTrigger.displayName = 'AnchorTrigger';
