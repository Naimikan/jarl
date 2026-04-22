import type { Position } from '../../AnchoredElement.types';

export interface GetPositionParams {
  allowedPositions?: Partial<Position[]>;
  anchoredElement: HTMLElement | null;
  anchoredElementContent: HTMLElement | null;
  arrowElement: HTMLDivElement | null;
  avoidPositionRecalculation?: boolean;
  boundary?: HTMLElement | null;
  forceOpenEvenNotFit?: boolean;
  initialPosition?: Position;
  position: Position;
  positionsChecked?: Partial<Position[]>;
  sameWithAsTrigger?: boolean;
  triggerElement: HTMLElement | null;
  withAppendTo?: boolean;
}

export type GetPositionReturn = {
  position: Position;
  shouldHide: boolean;
  top: number | null;
  left: number | null;
  width: number | null | undefined;
  isInsideAnchoredElement: boolean;
  lastVisiblePosition: Position;
};

export type GetBasicPositionParams = Pick<
  GetPositionParams,
  | 'anchoredElement'
  | 'triggerElement'
  | 'arrowElement'
  | 'boundary'
  | 'position'
  | 'sameWithAsTrigger'
  | 'withAppendTo'
>;

export interface GetBasicPositionReturn {
  isInsideAnchoredElement: boolean;
  left: number | null;
  top: number | null;
  width?: number | null;
}

export interface CheckInsideBoundaryParams {
  anchoredElement: HTMLElement | null;
  boundary?: HTMLElement | null;
  positionToCheck: Omit<GetBasicPositionReturn, 'width'>;
  triggerElement: HTMLElement | null;
  withAppendTo?: boolean;
}

export interface CheckInsideViewportParams {
  anchoredElement: HTMLElement | null;
  positionToCheck: Omit<GetBasicPositionReturn, 'width'>;
  triggerElement: HTMLElement | null;
}

export interface IsInsideViewportOrBoundaryParams {
  anchoredElement: HTMLElement | null;
  boundary?: HTMLElement | null;
  positionToCheck: Omit<GetBasicPositionReturn, 'width'>;
  triggerElement: HTMLElement | null;
  withAppendTo?: boolean;
}
