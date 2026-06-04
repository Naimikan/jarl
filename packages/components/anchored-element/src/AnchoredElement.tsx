import { createContext, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import {
  useClickOutside,
  useDisableBackgroundScroll,
  useEscape,
  useLatest,
  useMutationObserver,
} from '@jarl/react-utils';

import { AnchorContent } from './components/Content';
import { AnchorTrigger } from './components/Trigger';
import { ANIMATION_STATES, POSITIONS, TRIGGER_EVENTS } from './constants';
import { getDelay } from './helpers/get-delay';

import type {
  AnchoredElementContextType,
  AnchoredElementProps,
  AnimationState,
  Position,
} from './AnchoredElement.types';

export const AnchoredElementContext = createContext<AnchoredElementContextType | null>(null);

export const AnchoredElement = ({
  allowedPositions,
  appendTo,
  avoidPositionRecalculation = false,
  className,
  contentClassName,
  arrowClassName,
  disabled,
  content,
  children,
  disableBackgroundScroll = false,
  position = POSITIONS.TOP,
  delay = [300, 300],
  avoidCloseOnClickOutside = false,
  avoidCloseOnEscape = false,
  triggerEvents = [TRIGGER_EVENTS.HOVER, TRIGGER_EVENTS.FOCUS],
  disabledTrigger = false,
  forceOpenEvenNotFit = false,
  interactive = false,
  sameWithAsTrigger = false,
  boundary,
  withArrow = false,
  opened,
  onEscape: onEscapeProp,
  onClickOutside: onClickOutsideProp,
  onStartOpen,
  onOpened,
  onStartClose,
  onClosed,
  onPositionChanged,
}: AnchoredElementProps) => {
  const anchoredElementId = useId();
  const anchoredElementContentId = `${anchoredElementId}:content`;
  const triggerElementId = `${anchoredElementId}:trigger`;
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const anchoredElementRef = useRef<HTMLElement | null>(null);
  const anchoredElementContentRef = useRef<HTMLElement | null>(null);
  const arrowElementRef = useRef<HTMLDivElement | null>(null);

  const showDelayTimeoutIdRef = useRef<ReturnType<typeof setTimeout>>(null);
  const hideDelayTimeoutIdRef = useRef<ReturnType<typeof setTimeout>>(null);

  const isShowingAnimationRef = useRef(false);
  const isHiddingAnimationRef = useRef(false);

  const onOpenedRef = useLatest(onOpened);
  const onClosedRef = useLatest(onClosed);
  const onStartOpenRef = useLatest(onStartOpen);
  const onStartCloseRef = useLatest(onStartClose);
  const onPositionChangedRef = useLatest(onPositionChanged);
  const positionRef = useLatest(position);
  const boundaryRef = useLatest(boundary);
  const delayRef = useLatest(getDelay(delay));
  const allowedPositionsRef = useLatest(allowedPositions);
  const triggerEventsRef = useLatest(
    Array.isArray(triggerEvents) ? triggerEvents : [triggerEvents],
  );

  const [animationState, setAnimationState] = useState<AnimationState>(
    triggerEventsRef.current.includes(TRIGGER_EVENTS.MANUAL) && opened
      ? ANIMATION_STATES.OPENED
      : ANIMATION_STATES.CLOSED,
  );

  const show = useCallback(() => {
    onStartOpenRef.current?.();

    // Cancel current hide in progress
    if (hideDelayTimeoutIdRef.current) {
      clearTimeout(hideDelayTimeoutIdRef.current);
    }

    // If DOM element exists, it's opened
    if (anchoredElementContentRef.current) {
      isShowingAnimationRef.current = false;

      setAnimationState(ANIMATION_STATES.OPENED);
      onOpenedRef.current?.();
    } else {
      showDelayTimeoutIdRef.current = setTimeout(() => {
        isShowingAnimationRef.current = true;

        setAnimationState(ANIMATION_STATES.OPENING);
      }, delayRef.current.start);
    }
  }, []);

  const hide = useCallback(() => {
    onStartCloseRef.current?.();

    // Cancel current show in progress
    if (showDelayTimeoutIdRef.current) {
      clearTimeout(showDelayTimeoutIdRef.current);
    }

    // If DOM element does not exist, it's closed
    if (!anchoredElementContentRef.current) {
      isShowingAnimationRef.current = false;
      isHiddingAnimationRef.current = false;

      setAnimationState(ANIMATION_STATES.CLOSED);

      onClosedRef.current?.();
    } else {
      hideDelayTimeoutIdRef.current = setTimeout(() => {
        isShowingAnimationRef.current = false;
        isHiddingAnimationRef.current = true;

        setAnimationState(ANIMATION_STATES.CLOSING);

        anchoredElementContentRef.current = null;
      }, delayRef.current.end);
    }
  }, []);

  const hideCallback = useCallback(() => {
    if (anchoredElementRef.current) {
      const hasAnchoredElementChild = anchoredElementRef.current.querySelector('[data-anchor-id]');

      const openStates = [ANIMATION_STATES.OPENED, ANIMATION_STATES.OPENING] as Partial<
        AnimationState[]
      >;

      if (!hasAnchoredElementChild && openStates.includes(animationState)) {
        hide();
      }
    }
  }, [animationState, hide]);

  const onEscape = useCallback(() => {
    if (onEscapeProp) {
      onEscapeProp({
        hide,
        anchoredElement: anchoredElementRef.current,
        animationState,
      });
    } else {
      hideCallback();
    }
  }, [hideCallback, onEscapeProp, hide, animationState]);

  const onClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const isTriggerElementClicked =
        (event.target as HTMLElement).dataset.anchoredElement === anchoredElementId ||
        triggerElementRef.current?.contains(event.target as Node);

      if (!isTriggerElementClicked) {
        if (onClickOutsideProp) {
          onClickOutsideProp({
            hide,
            anchoredElement: anchoredElementRef.current,
            animationState,
          });
        } else {
          hideCallback();
        }
      }
    },
    [hideCallback, onClickOutsideProp, hide, animationState],
  );

  useDisableBackgroundScroll({
    rootElement: triggerElementRef.current,
    recursive: true,
    disabled: !disableBackgroundScroll || animationState === ANIMATION_STATES.CLOSED,
  });

  useClickOutside({
    callback: onClickOutside,
    disabled: avoidCloseOnClickOutside,
    rootElement: anchoredElementRef.current,
  });

  useEscape({ callback: onEscape, disabled: avoidCloseOnEscape });

  useMutationObserver({
    element: anchoredElementContentRef.current,
    callback: (mutations) => {
      let newPosition: Position | undefined;

      mutations.forEach((mutation: MutationRecord) => {
        if (mutation.attributeName) {
          newPosition = (mutation.target as HTMLElement).dataset[
            mutation.attributeName.replace('data-', '')
          ] as Position;
        }
      });

      if (newPosition) {
        onPositionChangedRef.current?.(newPosition);
      }
    },
    options: {
      attributes: true,
      attributeFilter: ['data-position'],
    },
  });

  useEffect(() => {
    if (triggerEventsRef.current.includes(TRIGGER_EVENTS.MANUAL)) {
      if (opened) {
        show();
      } else if (!opened) {
        hide();
      }
    }
  }, [opened, show, hide]);

  const contextValue = useMemo<AnchoredElementContextType>(
    () => ({
      id: anchoredElementId,
      contentId: anchoredElementContentId,
      triggerId: triggerElementId,
      appendTo,
      className,
      contentClassName,
      arrowClassName,
      disabled,
      get triggerElement() {
        return triggerElementRef.current;
      },
      set triggerElement(newValue: HTMLElement | null) {
        triggerElementRef.current = newValue;
      },
      get anchoredElement() {
        return anchoredElementRef.current;
      },
      set anchoredElement(newValue: HTMLElement | null) {
        anchoredElementRef.current = newValue;
      },
      get anchoredElementContent() {
        return anchoredElementContentRef.current;
      },
      set anchoredElementContent(newValue: HTMLElement | null) {
        anchoredElementContentRef.current = newValue;
      },
      get arrowElement() {
        return arrowElementRef.current;
      },
      set arrowElement(newValue: HTMLDivElement | null) {
        arrowElementRef.current = newValue;
      },
      get position() {
        return positionRef.current;
      },
      set position(newValue: Position) {
        positionRef.current = newValue;
      },
      get isHiddingAnimation() {
        return isHiddingAnimationRef.current;
      },
      set isHiddingAnimation(newValue: boolean) {
        isHiddingAnimationRef.current = newValue;
      },
      get isShowingAnimation() {
        return isShowingAnimationRef.current;
      },
      set isShowingAnimation(newValue: boolean) {
        isShowingAnimationRef.current = newValue;
      },
      triggerEvents: triggerEventsRef.current,
      delay: delayRef.current,
      boundary: boundaryRef.current,
      allowedPositions: allowedPositionsRef.current,
      disabledTrigger,
      sameWithAsTrigger,
      disableBackgroundScroll,
      withArrow,
      animationState,
      forceOpenEvenNotFit,
      interactive,
      avoidPositionRecalculation,
      show,
      hide,
      setAnimationState,
      onOpened: onOpenedRef.current,
      onClosed: onClosedRef.current,
    }),
    [
      anchoredElementId,
      anchoredElementContentId,
      triggerElementId,
      appendTo,
      className,
      contentClassName,
      arrowClassName,
      disabled,
      animationState,
      disabledTrigger,
      sameWithAsTrigger,
      disableBackgroundScroll,
      withArrow,
      forceOpenEvenNotFit,
      interactive,
      avoidPositionRecalculation,
      show,
      hide,
      setAnimationState,
    ],
  );

  return (
    <AnchoredElementContext.Provider value={contextValue}>
      <AnchorTrigger>{children}</AnchorTrigger>
      <AnchorContent>{content}</AnchorContent>
    </AnchoredElementContext.Provider>
  );
};

AnchoredElement.displayName = 'Jarl.AnchoredElement';

AnchoredElement.POSITIONS = POSITIONS;
AnchoredElement.TRIGGER_EVENTS = TRIGGER_EVENTS;
