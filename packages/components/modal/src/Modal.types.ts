import type { ReactNode } from 'react';

import type { AppendTo } from '@jarl/portal';

import type { AnimationStates, Positions } from './constants';

export type AnimationState = (typeof AnimationStates)[keyof typeof AnimationStates];
export type Position = (typeof Positions)[keyof typeof Positions];

export type DialogRole = 'dialog' | 'alertdialog';

export type CustomOnEscapePropParams = {
  animationState?: AnimationState;
  event?: KeyboardEvent;
};

export type CustomOnClickOutsidePropParams = {
  animationState?: AnimationState;
  event?: MouseEvent | TouchEvent;
};

export interface ModalProps {
  align?: Position;
  appendTo?: AppendTo;
  avoidCloseOnClickOutside?: boolean;
  avoidCloseOnEscape?: boolean;
  children: ReactNode;
  className?: string;
  initialFocusRef?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  justify?: Position;
  onClickOutside?: (params?: CustomOnClickOutsidePropParams) => void;
  onClosed?: () => void;
  onCloseRequested: () => void;
  onEscape?: (params?: CustomOnEscapePropParams) => void;
  onOpened?: () => void;
  opened: boolean;
  role?: DialogRole;
}

type ModalPropsToContext = Pick<
  ModalProps,
  | 'appendTo'
  | 'className'
  | 'onCloseRequested'
  | 'onClosed'
  | 'onOpened'
  | 'onClickOutside'
  | 'onEscape'
  | 'initialFocusRef'
>;

export type ModalContextType = ModalPropsToContext & {
  id: string;
  titleId: string;
  contentId: string;
  backdropId: string;
  animationState: AnimationState;
  setAnimationState: (newAnimationState: AnimationState) => void;
  role: DialogRole;
  justify: Position;
  align: Position;
  avoidCloseOnClickOutside: boolean;
  avoidCloseOnEscape: boolean;
};
