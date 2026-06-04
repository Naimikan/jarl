import { useCallback, useEffect } from 'react';

import { getScrollableContainersByElement, isNull } from '@jarl/utils';

import { ANIMATION_STATES, TRIGGER_EVENTS } from '../constants';
import { getPosition } from '../helpers/get-position';
import { useAnchoredContext } from './useAnchoredContext';

import type { AnimationState } from '../AnchoredElement.types';

export const useContentListeners = () => {
  const context = useAnchoredContext();
  const {
    allowedPositions,
    appendTo,
    disabled,
    disableBackgroundScroll,
    animationState,
    boundary,
    position,
    sameWithAsTrigger,
    triggerEvents,
    forceOpenEvenNotFit,
    avoidPositionRecalculation,
    hide,
    setAnimationState,
  } = context;

  const updatePosition = useCallback(() => {
    if (context.anchoredElement && context.triggerElement && context.anchoredElementContent) {
      const currentAnimationState = context.anchoredElementContent.dataset.state as AnimationState;

      const openStates = [ANIMATION_STATES.OPENED, ANIMATION_STATES.OPENING] as Partial<
        AnimationState[]
      >;

      const closeStates = [ANIMATION_STATES.CLOSED, ANIMATION_STATES.CLOSING] as Partial<
        AnimationState[]
      >;

      const {
        top,
        left,
        width,
        position: finalPosition,
        lastVisiblePosition,
        shouldHide,
      } = getPosition({
        anchoredElement: context.anchoredElement,
        anchoredElementContent: context.anchoredElementContent,
        triggerElement: context.triggerElement,
        position,
        sameWithAsTrigger,
        boundary,
        arrowElement: context.arrowElement,
        avoidPositionRecalculation,
        allowedPositions,
        forceOpenEvenNotFit,
        withAppendTo: !!appendTo,
      });

      if (shouldHide) {
        if (
          triggerEvents.includes(TRIGGER_EVENTS.MANUAL) ||
          isNull(top) ||
          isNull(left) ||
          isNull(width)
        ) {
          context.anchoredElement.style.visibility = 'hidden';
          context.anchoredElement.style.top = '0';
          context.anchoredElement.style.left = '0';
        } else if (openStates.includes(currentAnimationState)) {
          // If the anchoredElement is opened or opening, we can start the closing animation
          hide();
        } else {
          context.isHiddingAnimation = false;

          // If not, we force the closed state
          setAnimationState(ANIMATION_STATES.CLOSED);
        }
      } else {
        const hasTopChanged = parseInt(context.anchoredElement.style.top, 10) !== top;
        const hasLeftChanged = parseInt(context.anchoredElement.style.left, 10) !== left;
        const hasWidthChanged = parseInt(context.anchoredElement.style.width, 10) !== width;
        const hasPositionChanged =
          context.anchoredElementContent.dataset.position !== finalPosition;
        const hasLastPositionChanged =
          context.anchoredElementContent.dataset.lastVisiblePosition !== lastVisiblePosition;

        if (
          hasTopChanged ||
          hasLeftChanged ||
          hasPositionChanged ||
          hasWidthChanged ||
          hasLastPositionChanged
        ) {
          context.anchoredElement.style.visibility = 'visible';
        }

        if (hasTopChanged || hasLeftChanged) {
          context.anchoredElement.style.transform = `translate3d(${left}px, ${top}px, 0px)`;
        }

        if (hasPositionChanged) {
          context.anchoredElementContent.dataset.position = finalPosition;

          if (context.arrowElement) {
            context.arrowElement.dataset.position = finalPosition;
          }
        }

        if (lastVisiblePosition && hasLastPositionChanged) {
          context.anchoredElementContent.dataset.lastVisiblePosition = lastVisiblePosition;
        }

        if (sameWithAsTrigger && hasWidthChanged) {
          context.anchoredElement.style.width = `${width}px`;
        }

        if (closeStates.includes(currentAnimationState) && !context.isHiddingAnimation) {
          context.isShowingAnimation = true;
          context.anchoredElementContent.setAttribute('data-state', ANIMATION_STATES.OPENING);
          setAnimationState(ANIMATION_STATES.OPENING);
        }
      }
    }
  }, [
    appendTo,
    boundary,
    position,
    sameWithAsTrigger,
    avoidPositionRecalculation,
    allowedPositions,
    forceOpenEvenNotFit,
    triggerEvents,
    hide,
    setAnimationState,
  ]);

  useEffect(() => {
    const openStates = [ANIMATION_STATES.OPENED, ANIMATION_STATES.OPENING] as Partial<
      AnimationState[]
    >;

    if (openStates.includes(animationState)) {
      if (disabled) {
        hide();
      } else {
        updatePosition();
      }
    }
  }, [disabled, animationState, updatePosition, hide]);

  useEffect(() => {
    const scrollableContainers = getScrollableContainersByElement(context.triggerElement);

    const resizeObserver = new ResizeObserver(() => {
      let shouldReposition = true;

      if (context.anchoredElementContent) {
        const isClosing = context.anchoredElementContent.dataset.state === ANIMATION_STATES.CLOSING;
        const isOpening = context.anchoredElementContent.dataset.state === ANIMATION_STATES.OPENING;

        // In case that the element is resizing and the anchored element is closing or opening, we should avoid a reposition
        if (isClosing || isOpening) {
          shouldReposition = false;
        }
      }

      if (shouldReposition) {
        updatePosition();
      }
    });

    const openStates = [ANIMATION_STATES.OPENED, ANIMATION_STATES.OPENING] as Partial<
      AnimationState[]
    >;

    if (openStates.includes(animationState) && context.triggerElement) {
      resizeObserver.observe(context.triggerElement);

      if (context.anchoredElementContent) {
        resizeObserver.observe(context.anchoredElementContent);
      }

      scrollableContainers.forEach((eachContainer) => {
        eachContainer.addEventListener('scroll', updatePosition);
        eachContainer.addEventListener('resize', updatePosition);
      });

      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }

    return () => {
      if (context.triggerElement) {
        resizeObserver.unobserve(context.triggerElement);
      }

      if (context.anchoredElementContent) {
        resizeObserver.unobserve(context.anchoredElementContent);
      }

      scrollableContainers.forEach((eachContainer) => {
        eachContainer.removeEventListener('scroll', updatePosition);
        eachContainer.removeEventListener('resize', updatePosition);
      });

      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [animationState, disableBackgroundScroll, updatePosition]);
};
