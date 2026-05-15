import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';

import type { GetBasicPositionParams } from '../index.types';

type GetLeftBottomPositionParams = Omit<GetBasicPositionParams, 'position' | 'sameWithAsTrigger'>;

export const getLeftBottomPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
}: GetLeftBottomPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { height: anchoredElementHeight, width: anchoredElementWidth } =
      anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.LEFT_BOTTOM });

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
      finalTop = triggerElementBottom - anchoredElementHeight + scrollVertical;
      finalLeft = triggerElementLeft - arrowHeight - anchoredElementWidth + scrollHorizontal;
    } else if (closestAnchoredElement) {
      isInsideAnchoredElement = true;

      // Todo: check if is inside a dialog

      const closestTriggerElement: HTMLElement | null = closestAnchoredElement.querySelector(
        `[data-anchored-element="${anchorId}]`,
      );

      if (closestTriggerElement) {
        const { bottom: closestTriggerElementBottom, left: closestTriggerElementLeft } =
          getOffsetFromParent({
            parentElement: closestAnchoredElement,
            element: closestTriggerElement,
          });

        finalTop = closestTriggerElementBottom - anchoredElementHeight;
        finalLeft = closestTriggerElementLeft - anchoredElementWidth - arrowHeight;
      }
    }
  }

  return { top: finalTop, left: finalLeft, isInsideAnchoredElement };
};
