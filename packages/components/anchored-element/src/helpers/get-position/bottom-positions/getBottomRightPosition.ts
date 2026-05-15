import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';

import type { GetBasicPositionParams } from '../index.types';

type GetBottomRightPositionParams = Omit<GetBasicPositionParams, 'position' | 'sameWithAsTrigger'>;

export const getBottomRightPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
}: GetBottomRightPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { width: anchoredElementWidth } = anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.BOTTOM_RIGHT });

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
      finalTop = triggerElementBottom + arrowHeight + scrollVertical;
      finalLeft = triggerElementRight - anchoredElementWidth + scrollHorizontal;
    } else if (closestAnchoredElement) {
      isInsideAnchoredElement = true;

      // Todo: check if is inside a dialog

      const closestTriggerElement: HTMLElement | null = closestAnchoredElement.querySelector(
        `[data-anchored-element="${anchorId}]`,
      );

      if (closestTriggerElement) {
        const { bottom: closestTriggerElementBottom, right: closestTriggerElementRight } =
          getOffsetFromParent({
            parentElement: closestAnchoredElement,
            element: closestTriggerElement,
          });

        finalTop = closestTriggerElementBottom + arrowHeight;
        finalLeft = closestTriggerElementRight - anchoredElementWidth;
      }
    }
  }

  return { top: finalTop, left: finalLeft, isInsideAnchoredElement };
};
