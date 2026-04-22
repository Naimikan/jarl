import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants/positions';
import { getArrowHeight } from '../../get-arrow-height';

import type { GetBasicPositionParams } from '../index.types';

type GetBottomLeftPositionParams = Omit<GetBasicPositionParams, 'position' | 'sameWithAsTrigger'>;

export const getBottomLeftPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
}: GetBottomLeftPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.BOTTOM_LEFT });

    let triggerElementBottom: number;
    let triggerElementLeft: number;
    let scrollVertical = window.scrollY;
    let scrollHorizontal = window.scrollX;

    ({ bottom: triggerElementBottom, left: triggerElementLeft } =
      triggerElement.getBoundingClientRect());

    if (withAppendTo) {
      if (boundary) {
        ({ bottom: triggerElementBottom, left: triggerElementLeft } = getOffsetFromParent({
          parentElement: boundary,
          element: triggerElement,
        }));
        scrollVertical = boundary.scrollTop;
        scrollHorizontal = boundary.scrollLeft;
      } else if (triggerElement.parentElement) {
        ({ bottom: triggerElementBottom, left: triggerElementLeft } = getOffsetFromParent({
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
      finalLeft = triggerElementLeft + scrollHorizontal;
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
        } = getOffsetFromParent({
          parentElement: closestAnchoredElement,
          element: closestTriggerElement,
        });

        finalTop = closestTriggerElementTop + closestTriggerElementHeight + arrowHeight;
        finalLeft = closestTriggerElementLeft;
      }
    }
  }

  return { top: finalTop, left: finalLeft, isInsideAnchoredElement };
};
