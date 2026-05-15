import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';

import type { GetBasicPositionParams } from '../index.types';

type GetBottomPositionParams = Omit<GetBasicPositionParams, 'position'>;

export const getBottomPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
  sameWithAsTrigger,
}: GetBottomPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let finalWidth = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { width: anchoredElementWidth } = anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.BOTTOM });

    let triggerElementBottom: number;
    let triggerElementLeft: number;
    let triggerElementWidth: number;
    let scrollVertical = window.scrollY;
    let scrollHorizontal = window.scrollX;

    ({
      bottom: triggerElementBottom,
      left: triggerElementLeft,
      width: triggerElementWidth,
    } = triggerElement.getBoundingClientRect());

    if (withAppendTo) {
      if (boundary) {
        ({
          bottom: triggerElementBottom,
          left: triggerElementLeft,
          width: triggerElementWidth,
        } = getOffsetFromParent({
          parentElement: boundary,
          element: triggerElement,
        }));
        scrollVertical = boundary.scrollTop;
        scrollHorizontal = boundary.scrollLeft;
      } else if (triggerElement.parentElement) {
        ({
          bottom: triggerElementBottom,
          left: triggerElementLeft,
          width: triggerElementWidth,
        } = getOffsetFromParent({
          parentElement: triggerElement.parentElement,
          element: triggerElement,
        }));
        scrollVertical = triggerElement.parentElement.scrollTop;
        scrollHorizontal = triggerElement.parentElement.scrollLeft;
      }
    }

    const closestAnchoredElement: HTMLElement | null = triggerElement.closest('[data-anchor-id]');

    if (!closestAnchoredElement || boundary) {
      finalTop = triggerElementBottom + arrowHeight + scrollVertical;
      finalLeft =
        (sameWithAsTrigger
          ? triggerElementLeft
          : triggerElementLeft + triggerElementWidth / 2 - anchoredElementWidth / 2) +
        scrollHorizontal;
    } else if (closestAnchoredElement) {
      isInsideAnchoredElement = true;

      // Todo: check if is inside a dialog

      const closestTriggerElement: HTMLElement | null = closestAnchoredElement.querySelector(
        `[data-anchored-element="${anchorId}]`,
      );

      if (closestTriggerElement) {
        const {
          top: closestTriggerElementTop,
          left: closestTriggerElementLeft,
          height: closestTriggerElementHeight,
          width: closestTriggerElementWidth,
        } = getOffsetFromParent({
          parentElement: closestAnchoredElement,
          element: closestTriggerElement,
        });

        finalTop = closestTriggerElementTop + closestTriggerElementHeight + arrowHeight;
        finalLeft = sameWithAsTrigger
          ? closestTriggerElementLeft
          : closestTriggerElementLeft + closestTriggerElementWidth / 2 - anchoredElementWidth / 2;
      }

      if (sameWithAsTrigger) {
        finalWidth = triggerElementWidth;
      }
    }
  }

  return {
    top: finalTop,
    left: finalLeft,
    ...(finalWidth && { width: finalWidth }),
    isInsideAnchoredElement,
  };
};
