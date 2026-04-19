import { useCallback, useEffect } from 'react';

import { ANIMATION_STATES } from '../../../constants/animationStates';
import { POSITIONS } from '../../../constants/positions';
import { TRIGGER_EVENTS } from '../../../constants/triggerEvents';
import { useAnchoredContext } from '../../../hooks/useAnchoredContext';

import type { AnimationState, Position } from '../../../AnchoredElement.types';

type EventHandlers = {
  [key: string]: EventListener;
};

export const useTriggerListeners = () => {
  const context = useAnchoredContext();
  const { animationState, interactive, disableBackgroundScroll, triggerEvents, show, hide } =
    context;

  const isCursorOutsideInteractiveArea = useCallback((event: MouseEvent) => {
    if (context.triggerElement && context.anchoredElement) {
      const { clientX, clientY, target } = event;
      const {
        top: triggerElementTop,
        left: triggerElementLeft,
        width: triggerElementWidth,
        height: triggerElementHeight,
      } = context.triggerElement.getBoundingClientRect();

      const {
        top: anchoredElementTop,
        left: anchoredElementLeft,
        width: anchoredElementWidth,
        height: anchoredElementHeight,
      } = context.anchoredElement.getBoundingClientRect();

      const currentPosition = context.position;

      const isCursorOverAnchoredElement = context.anchoredElement.contains(target as Node);

      // If the cursor is over anchoredElement, the cursor is not outside the interactiveArea
      if (isCursorOverAnchoredElement) {
        return false;
      }

      let exceededTop = false;
      let exceededBottom = false;
      let exceededLeft = false;
      let exceededRight = false;

      const topPositions: Partial<Position[]> = [
        POSITIONS.TOP,
        POSITIONS.TOP_LEFT,
        POSITIONS.TOP_RIGHT,
      ];
      const bottomPositions: Partial<Position[]> = [
        POSITIONS.BOTTOM,
        POSITIONS.BOTTOM_LEFT,
        POSITIONS.BOTTOM_RIGHT,
      ];
      const leftPositions: Partial<Position[]> = [
        POSITIONS.LEFT,
        POSITIONS.LEFT_BOTTOM,
        POSITIONS.LEFT_TOP,
      ];
      const rightPositions: Partial<Position[]> = [
        POSITIONS.RIGHT,
        POSITIONS.RIGHT_BOTTOM,
        POSITIONS.RIGHT_TOP,
      ];

      if (topPositions.includes(currentPosition)) {
        exceededTop = clientY < anchoredElementTop;
        exceededBottom = clientY - (triggerElementTop + triggerElementHeight) > 0;
        exceededLeft = triggerElementLeft - clientX > 0;
        exceededRight = clientX - (triggerElementLeft + triggerElementWidth) > 0;
      } else if (bottomPositions.includes(currentPosition)) {
        exceededTop = triggerElementTop - clientY > 0;
        exceededBottom = clientY > anchoredElementTop + anchoredElementHeight;
        exceededLeft = triggerElementLeft - clientX > 0;
        exceededRight = clientX - (triggerElementLeft + triggerElementWidth) > 0;
      } else if (leftPositions.includes(currentPosition)) {
        exceededTop = triggerElementTop - clientY > 0;
        exceededBottom = clientY - (triggerElementTop + triggerElementHeight) > 0;
        exceededLeft = clientX < anchoredElementLeft;
        exceededRight = clientX - (triggerElementLeft + triggerElementWidth) > 0;
      } else if (rightPositions.includes(currentPosition)) {
        exceededTop = triggerElementTop - clientY > 0;
        exceededBottom = clientY - (triggerElementTop + triggerElementHeight) > 0;
        exceededLeft = triggerElementLeft - clientX > 0;
        exceededRight = clientX > anchoredElementLeft + anchoredElementWidth;
      }

      return exceededTop || exceededBottom || exceededLeft || exceededRight;
    }

    return true;
  }, []);

  const onFocusHandler = useCallback(() => {
    if (context.triggerElement) {
      context.triggerElement.setAttribute('data-focused', 'true');
      show();
    }
  }, [show]);

  const onBlurHandler = useCallback(() => {
    if (context.triggerElement) {
      context.triggerElement.setAttribute('data-focused', 'false');
      hide();
    }
  }, [hide]);

  const onClickHandler = useCallback(() => {
    const openStates = [ANIMATION_STATES.OPENED, ANIMATION_STATES.OPENING] as Partial<
      AnimationState[]
    >;

    if (openStates.includes(animationState)) {
      hide();
    } else {
      show();
    }
  }, [animationState, show, hide]);

  const onHoverClickHandler = useCallback(() => {
    const openStates = [ANIMATION_STATES.OPENED, ANIMATION_STATES.OPENING] as Partial<
      AnimationState[]
    >;

    if (openStates.includes(animationState)) {
      hide();
    }
  }, [animationState, hide]);

  const onMouseEnterHandler = useCallback(() => {
    if (context.triggerElement) {
      context.triggerElement.setAttribute('data-hovered', 'true');
      show();
    }
  }, [show]);

  const onMouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      if (context.triggerElement) {
        const eventTarget = event.target as Node;
        const isCursorOverTriggerElement = context.triggerElement.contains(eventTarget);

        if (!isCursorOverTriggerElement && isCursorOutsideInteractiveArea(event)) {
          context.triggerElement.setAttribute('data-hovered', 'false');
          document.removeEventListener('mousemove', onMouseMoveHandler);
          hide();
        }
      }
    },
    [hide],
  );

  const onMouseLeaveHandler = useCallback(
    (event: MouseEvent) => {
      if (context.triggerElement) {
        if (triggerEvents.includes(TRIGGER_EVENTS.HOVER)) {
          if (interactive) {
            document.addEventListener('mousemove', onMouseMoveHandler);
            onMouseMoveHandler(event);
          } else {
            context.triggerElement.setAttribute('data-hovered', 'false');
            hide();
          }
        } else {
          context.triggerElement.setAttribute('data-hovered', 'false');
          hide();
        }
      }
    },
    [interactive, triggerEvents, hide, onMouseMoveHandler],
  );

  useEffect(() => {
    if (!context.triggerElement || triggerEvents.length === 0) {
      return;
    }

    const eventHandlers: EventHandlers = {};

    if (triggerEvents.includes(TRIGGER_EVENTS.CLICK)) {
      eventHandlers[TRIGGER_EVENTS.CLICK] = onClickHandler;
    }

    if (triggerEvents.includes(TRIGGER_EVENTS.HOVER)) {
      eventHandlers.mouseenter = onMouseEnterHandler;
      eventHandlers.mouseleave = onMouseLeaveHandler as EventListener;
      eventHandlers.mousedown = onHoverClickHandler;
    }

    if (triggerEvents.includes(TRIGGER_EVENTS.FOCUS)) {
      eventHandlers.focus = onFocusHandler;
      eventHandlers.blur = onBlurHandler;
    }

    if (disableBackgroundScroll) {
      eventHandlers.blur = onBlurHandler;
    }

    Object.entries(eventHandlers).forEach(([eventName, listener]) => {
      context.triggerElement?.addEventListener(eventName, listener);
    });

    return () => {
      Object.entries(eventHandlers).forEach(([eventName, listener]) => {
        context.triggerElement?.removeEventListener(eventName, listener);
      });
    };
  }, [
    disableBackgroundScroll,
    triggerEvents,
    onClickHandler,
    onBlurHandler,
    onFocusHandler,
    onMouseEnterHandler,
    onMouseLeaveHandler,
    onHoverClickHandler,
  ]);
};
