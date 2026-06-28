import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import type { AppendTo } from '@jarl/portal';
import { extractElementFromRef, useDisableBackgroundScroll, useLatest } from '@jarl/react-utils';

import { AnimationStates, Positions } from '../constants';
import { ModalContext } from '../contexts/Modal.context';
import { getClosestOpenedDialog } from '../helpers/getClosestOpenedDialog';
import type { AnimationState, ModalContextType, ModalProps } from '../types/Modal.types';
import { Backdrop } from './Backdrop';
import { Body } from './Body';
import { CloseButton } from './CloseButton';
import { Content } from './Content';
import { Footer } from './Footer';
import { Header } from './Header';
import { Title } from './Title';

export const Modal = ({
  appendTo,
  avoidCloseOnClickOutside = false,
  avoidCloseOnEscape = false,
  children,
  className,
  onClickOutside: onClickOutsideProp,
  onClosed,
  onEscape: onEscapeProp,
  onOpened,
  onCloseRequested,
  opened,
  initialFocusRef,
  endFocusRef,
  align = Positions.center,
  justify = Positions.center,
  role = 'dialog',
}: ModalProps) => {
  const modalId = useId();
  const modalBackdropId = `${modalId}:backdrop`;
  const modalTitleId = `${modalId}:title`;
  const modalContentId = `${modalId}:content`;

  const restoreToTriggerFocusRef = useRef<HTMLElement | null>(null);

  const onOpenedRef = useLatest(onOpened);
  const onClosedRef = useLatest(onClosed);
  const onCloseRequestedRef = useLatest(onCloseRequested);
  const onEscapeRef = useLatest(onEscapeProp);
  const onClickOutsideRef = useLatest(onClickOutsideProp);

  const [animationState, setAnimationState] = useState<AnimationState>(
    opened ? AnimationStates.opening : AnimationStates.closed,
  );

  const [stateAppendTo, setStateAppendTo] = useState<AppendTo | undefined>(appendTo);

  const startOpenAnimation = useCallback(() => {
    const endFocusElement = extractElementFromRef(endFocusRef);
    restoreToTriggerFocusRef.current = endFocusElement || (document.activeElement as HTMLElement);

    const closestOpenedDialog = getClosestOpenedDialog();

    const isBodyElement = closestOpenedDialog === document.body;

    setStateAppendTo((prevAppendTo) =>
      isBodyElement ? prevAppendTo : closestOpenedDialog || prevAppendTo,
    );

    setAnimationState(AnimationStates.opening);
  }, [endFocusRef]);

  const startCloseAnimation = useCallback(() => {
    setAnimationState(AnimationStates.closing);
  }, []);

  useDisableBackgroundScroll({
    rootElement: typeof document !== 'undefined' ? document.body : null,
    disabled: animationState === AnimationStates.closed,
  });

  useEffect(() => {
    const openStates = [AnimationStates.opened, AnimationStates.opening] as Partial<
      AnimationState[]
    >;

    const closeStates = [AnimationStates.closed, AnimationStates.closing] as Partial<
      AnimationState[]
    >;

    if (opened && closeStates.includes(animationState)) {
      startOpenAnimation();
    } else if (!opened && openStates.includes(animationState)) {
      startCloseAnimation();
    }
  }, [opened, animationState, startOpenAnimation, startCloseAnimation]);

  const contextValue = useMemo<ModalContextType>(
    () => ({
      id: modalId,
      titleId: modalTitleId,
      contentId: modalContentId,
      backdropId: modalBackdropId,
      appendTo: stateAppendTo,
      avoidCloseOnClickOutside,
      avoidCloseOnEscape,
      className,
      role,
      align,
      justify,
      animationState,
      initialFocusRef,
      restoreToTriggerFocusRef,
      setAnimationState,
      onOpened: onOpenedRef.current,
      onClosed: onClosedRef.current,
      onCloseRequested: onCloseRequestedRef.current,
      onEscape: onEscapeRef.current,
      onClickOutside: onClickOutsideRef.current,
    }),
    [
      modalId,
      modalContentId,
      modalTitleId,
      modalBackdropId,
      animationState,
      stateAppendTo,
      className,
      role,
      align,
      justify,
      avoidCloseOnClickOutside,
      avoidCloseOnEscape,
    ],
  );

  return (
    animationState !== AnimationStates.closed && (
      <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
    )
  );
};

Modal.displayName = 'Jarl.Modal';

Modal.Positions = Positions;

Modal.Backdrop = Backdrop;
Modal.Content = Content;
Modal.CloseButton = CloseButton;
Modal.Header = Header;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;
