import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';

import type { GetBasicPositionParams } from '../index.types';

type GetRightPositionParams = Omit<GetBasicPositionParams, 'position' | 'sameWithAsTrigger'>;

export const getRightPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
}: GetRightPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { height: anchoredElementHeight } = anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.RIGHT });

    let triggerElementTop: number;
    let triggerElementRight: number;
    let triggerElementHeight: number;
    let scrollVertical = window.scrollY;
    let scrollHorizontal = window.scrollX;

    ({
      top: triggerElementTop,
      right: triggerElementRight,
      height: triggerElementHeight,
    } = triggerElement.getBoundingClientRect());

    if (withAppendTo) {
      if (boundary) {
        ({
          top: triggerElementTop,
          right: triggerElementRight,
          height: triggerElementHeight,
        } = getOffsetFromParent({
          parentElement: boundary,
          element: triggerElement,
        }));
        scrollVertical = boundary.scrollTop;
        scrollHorizontal = boundary.scrollLeft;
      } else if (triggerElement.parentElement) {
        ({
          top: triggerElementTop,
          right: triggerElementRight,
          height: triggerElementHeight,
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
      finalTop =
        triggerElementTop + triggerElementHeight / 2 - anchoredElementHeight / 2 + scrollVertical;
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
          right: closestTriggerElementRight,
          height: closestTriggerElementHeight,
        } = getOffsetFromParent({
          parentElement: closestAnchoredElement,
          element: closestTriggerElement,
        });

        finalTop =
          closestTriggerElementTop + closestTriggerElementHeight / 2 - anchoredElementHeight / 2;
        finalLeft = closestTriggerElementRight + arrowHeight;
      }
    }
  }

  return { top: finalTop, left: finalLeft, isInsideAnchoredElement };
};
