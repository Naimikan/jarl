import { createContext, useCallback, useEffect, useId, useMemo, useState } from 'react';

import { useDisableBackgroundScroll, useLatest } from '@jarl/react-utils';
import { isDefined } from '@jarl/utils';

import { Backdrop } from './components/Backdrop';
import { Body } from './components/Body';
import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Title } from './components/Title';
import { ANIMATION_STATES, POSITIONS } from './constants';
import { getClosestOpenedDialog } from './helpers/getClosestOpenedDialog';

import type { AppendTo } from '@jarl/portal';

import type { AnimationState, ModalContextType, ModalProps } from './Modal.types';

export const ModalContext = createContext<ModalContextType | null>(null);

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
  align = 'center',
  justify = 'center',
  role = 'dialog',
}: ModalProps) => {
  const modalId = useId();
  const modalBackdropId = `${modalId}:backdrop`;
  const modalTitleId = `${modalId}:title`;
  const modalContentId = `${modalId}:content`;

  const onOpenedRef = useLatest(onOpened);
  const onClosedRef = useLatest(onClosed);
  const onCloseRequestedRef = useLatest(onCloseRequested);
  const onEscapeRef = useLatest(onEscapeProp);
  const onClickOutsideRef = useLatest(onClickOutsideProp);

  const [animationState, setAnimationState] = useState<AnimationState>(
    opened ? ANIMATION_STATES.OPENING : ANIMATION_STATES.CLOSED,
  );

  const [stateAppendTo, setStateAppendTo] = useState<AppendTo | undefined>(appendTo);

  const startOpenAnimation = useCallback(() => {
    const closestOpenedDialog = getClosestOpenedDialog();

    const isBodyElement = closestOpenedDialog === document.body;

    setStateAppendTo((prevAppendTo) =>
      isBodyElement ? prevAppendTo : closestOpenedDialog || prevAppendTo,
    );

    setAnimationState(ANIMATION_STATES.OPENING);
  }, []);

  const startCloseAnimation = useCallback(() => {
    setAnimationState(ANIMATION_STATES.CLOSING);
  }, []);

  useDisableBackgroundScroll({
    rootElement: isDefined(document) ? document.body : null,
    recursive: true,
    disabled: animationState === ANIMATION_STATES.CLOSED,
  });

  useEffect(() => {
    const openStates = [ANIMATION_STATES.OPENED, ANIMATION_STATES.OPENING] as Partial<
      AnimationState[]
    >;

    const closeStates = [ANIMATION_STATES.CLOSED, ANIMATION_STATES.CLOSING] as Partial<
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
    animationState !== ANIMATION_STATES.CLOSED && (
      <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
    )
  );
};

Modal.displayName = 'Jarl.Modal';

Modal.POSITIONS = POSITIONS;

Modal.Backdrop = Backdrop;
Modal.Content = Content;
Modal.Header = Header;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;
