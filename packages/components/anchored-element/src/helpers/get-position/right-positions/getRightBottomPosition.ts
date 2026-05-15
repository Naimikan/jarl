import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';

import type { GetBasicPositionParams } from '../index.types';

type GetRightBottomPositionParams = Omit<GetBasicPositionParams, 'position' | 'sameWithAsTrigger'>;

export const getRightBottomPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
}: GetRightBottomPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { height: anchoredElementHeight } = anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.RIGHT_BOTTOM });

    let triggerElementBottom: number;
    let triggerElementRight: number;
    let scrollVertical = window.scrollY;
    let scrollHorizontal = window.scrollX;

    ({ bottom: triggerElementBottom, right: triggerElementRight } =
      triggerElement.getBoundingClientRect());

    if (withAppendTo) {
      if (boundary) {
        ({ bottom: triggerElementBottom, right: triggerElementRight } = getOffsetFromParent({
          parentElement: boundary,
          element: triggerElement,
        }));
        scrollVertical = boundary.scrollTop;
        scrollHorizontal = boundary.scrollLeft;
      } else if (triggerElement.parentElement) {
        ({ bottom: triggerElementBottom, right: triggerElementRight } = getOffsetFromParent({
          parentElement: triggerElement.parentElement,
          element: triggerElement,
        }));
        scrollVertical = triggerElement.parentElement.scrollTop;
        scrollHorizontal = triggerElement.parentElement.scrollLeft;
      }
    }

    const closestAnchoredElement: HTMLElement | null = triggerElement.closest('[data-anchor-id]');

    if (!closestAnchoredElement || boundary) {
      finalTop = triggerElementBottom - anchoredElementHeight + scrollVertical;
      finalLeft = triggerElementRight + arrowHeight + scrollHorizontal;
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

        finalTop =
          closestTriggerElementTop - Math.abs(closestTriggerElementHeight - anchoredElementHeight);
        finalLeft = closestTriggerElementLeft + closestTriggerElementWidth + arrowHeight;
      }
    }
  }

  return { top: finalTop, left: finalLeft, isInsideAnchoredElement };
};
