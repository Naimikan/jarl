import { useCallback } from 'react';

import { Portal } from '@jarl/portal';
import { cx } from '@jarl/styled-system/css';
import { anchoredElement } from '@jarl/styled-system/recipes';

import { ANIMATION_STATES } from '../../constants/animationStates';
import { useAnchoredContext } from '../../hooks/useAnchoredContext';
import { Arrow } from './arrow';
import { useContentListeners } from './hooks/useAnchorContentListeners';

import type { AnchorContentProps } from './index.types';

export const AnchorContent = ({ children }: AnchorContentProps) => {
  const context = useAnchoredContext();
  const {
    id,
    contentId,
    appendTo,
    className,
    contentClassName,
    arrowClassName,
    animationState,
    triggerEvents,
    withArrow,
    show,
    hide,
    setAnimationState,
    onClosed,
    onOpened,
  } = context;

  const childrenAsFunction = typeof children === 'function' ? children : () => children;

  const setAnchoredElementRef = (node: HTMLDivElement) => {
    if (node) {
      context.anchoredElement = node;
    }
  };

  const setAnchoredContentRef = (node: HTMLDivElement) => {
    if (node) {
      context.anchoredElementContent = node;
    }
  };

  const setArrowElementRef = (node: HTMLDivElement) => {
    if (node) {
      context.arrowElement = node;
    }
  };

  const onAnimationEnd = useCallback(() => {
    if (context.triggerElement && context.anchoredElementContent) {
      if (context.isHiddingAnimation) {
        context.isHiddingAnimation = false;

        setAnimationState(ANIMATION_STATES.CLOSED);

        context.anchoredElementContent = null;
        context.anchoredElement?.removeAttribute('style');

        onClosed?.();
      } else if (context.isShowingAnimation) {
        context.isShowingAnimation = false;

        context.anchoredElementContent.setAttribute('data-state', ANIMATION_STATES.OPENED);
        setAnimationState(ANIMATION_STATES.OPENED);
        onOpened?.();
      }
    }
  }, [triggerEvents, onClosed, onOpened, animationState, setAnimationState]);

  useContentListeners();

  return (
    <Portal
      appendTo={appendTo}
      className={cx(anchoredElement().root, className)}
      data-anchor-id={id}
      ref={setAnchoredElementRef}
    >
      {animationState !== ANIMATION_STATES.CLOSED && (
        <div
          className={cx(anchoredElement().content, contentClassName)}
          data-position={context.position}
          data-state={animationState}
          id={contentId}
          onAnimationEnd={onAnimationEnd}
          ref={setAnchoredContentRef}
        >
          {childrenAsFunction({ show, hide })}

          {withArrow && (
            <Arrow
              className={cx(anchoredElement().arrow, arrowClassName)}
              data-position={context.position}
              ref={setArrowElementRef}
            />
          )}
        </div>
      )}
    </Portal>
  );
};

AnchorContent.displayName = 'Jarl.AnchoredElement.AnchorContent';
