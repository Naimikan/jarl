/// <reference path="../../../typescript-config/declarations.d.ts" />

import type { ReactElement, ReactNode, Ref } from 'react';

import type { AppendTo } from '@jarl/portal';

import type { ANIMATION_STATES, POSITIONS, TRIGGER_EVENTS } from './constants';

export type TriggerEvent = (typeof TRIGGER_EVENTS)[keyof typeof TRIGGER_EVENTS];
export type Position = (typeof POSITIONS)[keyof typeof POSITIONS];
export type AnimationState = (typeof ANIMATION_STATES)[keyof typeof ANIMATION_STATES];

export type ElementWithRef = ReactElement<Record<string, unknown>> & {
  ref?: Ref<HTMLElement | null>;
};

export type CustomOnEscapePropParams = {
  hide?: () => void;
  anchoredElement?: HTMLElement | null;
  animationState?: AnimationState;
};

export type CustomOnClickOutsidePropParams = {
  hide?: () => void;
  anchoredElement?: HTMLElement | null;
  animationState?: AnimationState;
};

export interface AnchoredElementProps {
  allowedPositions?: Partial<Position[]>;
  appendTo?: AppendTo;
  arrowClassName?: string;
  avoidCloseOnClickOutside?: boolean;
  avoidCloseOnEscape?: boolean;
  avoidPositionRecalculation?: boolean;
  boundary?: HTMLElement | null;
  children: ReactElement<Record<string, unknown>>;
  className?: string;
  content: ReactNode;
  contentClassName?: string;
  delay?: number | [number, number];
  disableBackgroundScroll?: boolean;
  disabled?: boolean;
  disabledTrigger?: boolean;
  forceOpenEvenNotFit?: boolean;
  interactive?: boolean;
  onClickOutside?: (params?: CustomOnClickOutsidePropParams) => void;
  onClosed?: () => void;
  onEscape?: (params?: CustomOnEscapePropParams) => void;
  onOpened?: () => void;
  onPositionChanged?: (newPosition: Position) => void;
  opened?: boolean;
  position?: Position;
  sameWithAsTrigger?: boolean;
  triggerEvents?: TriggerEvent | TriggerEvent[];
  withArrow?: boolean;
}

type AnchoredElementPropsToContext = Pick<
  AnchoredElementProps,
  | 'allowedPositions'
  | 'appendTo'
  | 'arrowClassName'
  | 'avoidPositionRecalculation'
  | 'boundary'
  | 'className'
  | 'contentClassName'
  | 'disableBackgroundScroll'
  | 'disabled'
  | 'disabledTrigger'
  | 'forceOpenEvenNotFit'
  | 'interactive'
  | 'sameWithAsTrigger'
  | 'onClosed'
  | 'onOpened'
  | 'withArrow'
>;

export type AnchoredElementContextType = AnchoredElementPropsToContext & {
  id: string;
  contentId: string;
  triggerId: string;
  get triggerElement(): HTMLElement | null;
  set triggerElement(value: HTMLElement | null);
  get anchoredElement(): HTMLElement | null;
  set anchoredElement(value: HTMLElement | null);
  get anchoredElementContent(): HTMLElement | null;
  set anchoredElementContent(newValue: HTMLElement | null);
  get arrowElement(): HTMLDivElement | null;
  set arrowElement(newValue: HTMLDivElement | null);
  get position(): Position;
  set position(value: Position);
  get isHiddingAnimation(): boolean;
  set isHiddingAnimation(newValue: boolean);
  get isShowingAnimation(): boolean;
  set isShowingAnimation(newValue: boolean);
  delay: { start: number; end: number };
  triggerEvents: TriggerEvent[];
  animationState: AnimationState;
  show: () => void;
  hide: () => void;
  setAnimationState: (animationState: AnimationState) => void;
};
