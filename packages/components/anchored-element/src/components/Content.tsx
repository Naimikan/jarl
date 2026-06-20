import type { ReactNode } from 'react';
import { useCallback } from 'react';

import { Portal } from '@jarl/portal';
import { cx } from '@jarl/utils';

import { ANIMATION_STATES } from '../constants';
import { useContentListeners } from '../hooks/useAnchorContentListeners';
import { useAnchoredContext } from '../hooks/useAnchoredContext';
import { Arrow } from './Arrow';

import './Content.styles.css';

export type ChildrenFunction = {
  show?: () => void;
  hide?: () => void;
};

export type ChildrenAsFunction = (params?: ChildrenFunction) => ReactNode;

export interface AnchorContentProps {
  children: ReactNode | ChildrenAsFunction;
}

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
      className={cx('jarl-anchored-element', className)}
      data-anchor-id={id}
      ref={setAnchoredElementRef}
    >
      {animationState !== ANIMATION_STATES.CLOSED && (
        <div
          className={cx('jarl-anchored-element__content', contentClassName)}
          data-position={context.position}
          data-state={animationState}
          id={contentId}
          onAnimationEnd={onAnimationEnd}
          ref={setAnchoredContentRef}
        >
          {childrenAsFunction({ show, hide })}

          {withArrow && (
            <Arrow
              className={arrowClassName}
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
