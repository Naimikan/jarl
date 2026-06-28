import type { ComponentPropsWithRef, Ref } from 'react';
import { cloneElement } from 'react';

import { ANIMATION_STATES, TRIGGER_EVENTS } from '../constants';
import { useAnchoredContext } from '../hooks/useAnchoredContext';
import { useTriggerListeners } from '../hooks/useAnchorTriggerListeners';
import type { ElementWithRef } from '../types/AnchoredElement.types';

export interface AnchorTriggerProps {
  children: ElementWithRef;
}

export type CloneAnchorTrigger = {
  ref: Ref<HTMLElement>;
  [key: string]: unknown;
};

export interface WrapperProps extends ComponentPropsWithRef<'span'> {
  children: ElementWithRef;
}

export const Wrapper = ({ children, ref, ...props }: WrapperProps) => (
  <span ref={ref} {...props}>
    {children}
  </span>
);

export const AnchorTrigger = ({ children }: AnchorTriggerProps) => {
  const context = useAnchoredContext();
  const { id, contentId, triggerId, disabledTrigger, animationState, triggerEvents } = context;

  const hasFocusTrigger = triggerEvents.some((eachTrigger) => eachTrigger === TRIGGER_EVENTS.FOCUS);
  const isOpened = animationState === ANIMATION_STATES.OPENED;

  useTriggerListeners();

  let triggerChildren = children;

  if (disabledTrigger) {
    const wrappedChildren = cloneElement(children, {
      ...(isOpened ? { 'aria-describedby': contentId } : {}),
      style: {
        ...(children.props.style || {}),
        pointerEvents: 'none',
      },
    });

    triggerChildren = <Wrapper>{wrappedChildren}</Wrapper>;
  }

  return cloneElement(triggerChildren, {
    ref: (node) => {
      context.triggerElement = node;

      if (!disabledTrigger) {
        const originalRef = triggerChildren.ref;
        if (typeof originalRef === 'function') {
          originalRef(node);
        } else if (originalRef) {
          originalRef.current = node;
        }
      }
    },
    id: triggerId,
    tabIndex: hasFocusTrigger ? 0 : undefined,
    'data-anchored-element': id,
    ...(isOpened ? { 'aria-describedby': contentId } : {}),
  } as CloneAnchorTrigger);
};

AnchorTrigger.displayName = 'Jarl.AnchoredElement.AnchorTrigger';
