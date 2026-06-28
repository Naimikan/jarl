import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';
import type { GetBasicPositionParams } from '../index.types';

type GetTopPositionParams = Omit<GetBasicPositionParams, 'position'>;

export const getTopPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
  sameWithAsTrigger,
}: GetTopPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let finalWidth = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { height: anchoredElementHeight, width: anchoredElementWidth } =
      anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.TOP });

    let triggerElementTop: number;
    let triggerElementLeft: number;
    let triggerElementWidth: number;
    let scrollVertical = window.scrollY;
    let scrollHorizontal = window.scrollX;

    ({
      top: triggerElementTop,
      left: triggerElementLeft,
      width: triggerElementWidth,
    } = triggerElement.getBoundingClientRect());

    if (withAppendTo) {
      if (boundary) {
        ({
          top: triggerElementTop,
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
          top: triggerElementTop,
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
      finalTop = triggerElementTop - anchoredElementHeight - arrowHeight + scrollVertical;
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
          width: closestTriggerElementWidth,
        } = getOffsetFromParent({
          parentElement: closestAnchoredElement,
          element: closestTriggerElement,
        });

        finalTop = closestTriggerElementTop - anchoredElementHeight - arrowHeight;
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
