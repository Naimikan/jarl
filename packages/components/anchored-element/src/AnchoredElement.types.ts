import type { ReactElement, ReactNode, Ref } from 'react';

import type { AppendTo } from '@jarl/portal';

import type { ANIMATION_STATES } from './constants/animationStates';
import type { POSITIONS } from './constants/positions';
import type { TRIGGER_EVENTS } from './constants/triggerEvents';

export type TriggerEvent = (typeof TRIGGER_EVENTS)[keyof typeof TRIGGER_EVENTS];
export type Position = (typeof POSITIONS)[keyof typeof POSITIONS];
export type AnimationState = (typeof ANIMATION_STATES)[keyof typeof ANIMATION_STATES];

export type ElementWithRef = ReactElement & {
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
  children: ReactElement;
  className?: string;
  content: ReactNode;
  contentClassName?: string;
  delay?: number | [number, number];
  disableBackgroundScroll?: boolean;
  disabled?: boolean;
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
  wrapTrigger?: boolean;
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
  | 'forceOpenEvenNotFit'
  | 'interactive'
  | 'sameWithAsTrigger'
  | 'onClosed'
  | 'onOpened'
  | 'withArrow'
  | 'wrapTrigger'
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
