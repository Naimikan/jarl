import { type ReactNode, useCallback, useRef } from 'react';

import { Portal } from '@jarl/portal';
import { useClickOutside, useEscape } from '@jarl/react-utils';
import { cx } from '@jarl/styled-system/css';
import { modal } from '@jarl/styled-system/recipes';

import { ANIMATION_STATES } from '../constants/animationStates';
import { useInert } from '../hooks/useInert';
import { useModalContext } from '../hooks/useModalContext';

import type { AnimationState } from '../Modal.types';

export interface ContentProps {
  children: ReactNode;
  className?: string;
}

export const Content = ({ className, children }: ContentProps) => {
  const {
    appendTo,
    titleId,
    contentId,
    role,
    align,
    justify,
    animationState,
    avoidCloseOnClickOutside,
    avoidCloseOnEscape,
    id,
    className: classNameProp,
    setAnimationState,
    onOpened,
    onClosed,
    onCloseRequested,
    onEscape: onEscapeProp,
    onClickOutside: onClickOutsideProp,
  } = useModalContext();

  const modalPortalRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openStatesRef = useRef([ANIMATION_STATES.OPENED, ANIMATION_STATES.OPENING] as Partial<
    AnimationState[]
  >);

  const onAnimationEnd = useCallback(() => {
    if (animationState === ANIMATION_STATES.OPENING) {
      setAnimationState(ANIMATION_STATES.OPENED);

      onOpened?.();
    } else if (animationState === ANIMATION_STATES.CLOSING) {
      setAnimationState(ANIMATION_STATES.CLOSED);

      onClosed?.();
    }
  }, [animationState, onClosed, onOpened, setAnimationState]);

  const closeCallback = useCallback(() => {
    if (openStatesRef.current.includes(animationState)) {
      const existNestedDialog = modalRef.current?.querySelector(
        `[role="dialog"]:not([id="${contentId}"]), [role="alertdialog"]:not([id="${contentId}"])`,
      );

      if (!existNestedDialog) {
        onCloseRequested();
      }
    }
  }, [animationState, contentId, onCloseRequested]);

  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (onEscapeProp) {
        onEscapeProp({ animationState, event });
      } else {
        closeCallback();
      }
    },
    [onEscapeProp, animationState, closeCallback],
  );

  const onClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (onClickOutsideProp) {
        onClickOutsideProp({ animationState, event });
      } else {
        closeCallback();
      }
    },
    [onClickOutsideProp, animationState, closeCallback],
  );

  useClickOutside({
    callback: onClickOutside,
    disabled: avoidCloseOnClickOutside,
    rootElement: contentId, // ToDo: use ref instead id
  });

  useEscape({ callback: onEscape, disabled: avoidCloseOnEscape });

  useInert({
    isOpened: openStatesRef.current.includes(animationState),
    modalElement: modalPortalRef.current,
  });

  return (
    <Portal
      appendTo={appendTo}
      className={cx(modal().root, classNameProp)}
      data-align={align}
      data-justify={justify}
      data-state={animationState}
      id={id}
      onAnimationEnd={onAnimationEnd}
      ref={modalPortalRef}
    >
      {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: aria-modal is valid for dialog and alertdialog roles */}
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className={cx(modal().content, className)}
        id={contentId}
        ref={modalRef}
        role={role}
      >
        {children}
      </div>
    </Portal>
  );
};

Content.displayName = 'Jarl.Modal.Content';
