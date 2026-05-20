import { type ReactNode, useCallback, useMemo, useRef } from 'react';

import { Portal } from '@jarl/portal';
import { useClickOutside, useEscape, useFocusTrap } from '@jarl/react-utils';
import { cx, getFocusableElements } from '@jarl/utils';

import { AnimationStates } from '../constants';
import { useInert } from '../hooks/useInert';
import { useModalContext } from '../hooks/useModalContext';

import type { AnimationState } from '../Modal.types';

import './Content.styles.css';

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
    initialFocusRef,
    restoreToTriggerFocusRef,
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

  const openStatesRef = useRef([AnimationStates.opened, AnimationStates.opening] as Partial<
    AnimationState[]
  >);

  const isOpened = useMemo(() => openStatesRef.current.includes(animationState), [animationState]);

  const onAnimationEnd = useCallback(() => {
    if (animationState === AnimationStates.opening) {
      if (getFocusableElements(modalPortalRef.current).length === 0) {
        modalRef.current?.focus();
      }

      setAnimationState(AnimationStates.opened);

      onOpened?.();
    } else if (animationState === AnimationStates.closing) {
      restoreToTriggerFocusRef.current?.focus();

      setAnimationState(AnimationStates.closed);

      onClosed?.();
    }
  }, [animationState, onClosed, onOpened, setAnimationState]);

  const closeCallback = useCallback(() => {
    if (isOpened) {
      const existNestedDialog = modalRef.current?.querySelector(
        `[role="dialog"]:not([id="${contentId}"]), [role="alertdialog"]:not([id="${contentId}"])`,
      );

      const existNestedAnchoredElement = modalPortalRef.current?.querySelector(
        '[data-anchor-id] > [data-state]',
      );

      if (!(existNestedDialog || existNestedAnchoredElement)) {
        onCloseRequested();
      }
    }
  }, [contentId, isOpened, onCloseRequested]);

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
    rootElement: modalRef.current,
  });

  useEscape({ callback: onEscape, disabled: avoidCloseOnEscape });

  useInert({
    isOpened,
    modalElement: modalPortalRef.current,
  });

  useFocusTrap({
    initialFocusedElement: initialFocusRef,
    rootElement: modalPortalRef,
  });

  return (
    <Portal
      appendTo={appendTo}
      className={cx('jarl-modal', classNameProp)}
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
        className={cx('jarl-modal__content', className)}
        id={contentId}
        ref={modalRef}
        role={role}
        tabIndex={-1}
      >
        {children}
      </div>
    </Portal>
  );
};

Content.displayName = 'Jarl.Modal.Content';
