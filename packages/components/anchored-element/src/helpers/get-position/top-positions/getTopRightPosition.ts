import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';
import type { GetBasicPositionParams } from '../index.types';

type GetTopRightPositionParams = Omit<GetBasicPositionParams, 'position' | 'sameWithAsTrigger'>;

export const getTopRightPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
}: GetTopRightPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { height: anchoredElementHeight, width: anchoredElementWidth } =
      anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.TOP_RIGHT });

    let triggerElementTop: number;
    let triggerElementRight: number;
    let scrollVertical = window.scrollY;
    let scrollHorizontal = window.scrollX;

    ({ top: triggerElementTop, right: triggerElementRight } =
      triggerElement.getBoundingClientRect());

    if (withAppendTo) {
      if (boundary) {
        ({ top: triggerElementTop, right: triggerElementRight } = getOffsetFromParent({
          parentElement: boundary,
          element: triggerElement,
        }));
        scrollVertical = boundary.scrollTop;
        scrollHorizontal = boundary.scrollLeft;
      } else if (triggerElement.parentElement) {
        ({ top: triggerElementTop, right: triggerElementRight } = getOffsetFromParent({
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
      finalLeft = triggerElementRight - anchoredElementWidth + scrollHorizontal;
    } else if (closestAnchoredElement) {
      isInsideAnchoredElement = true;

      // Todo: check if is inside a dialog

      const closestTriggerElement: HTMLElement | null = closestAnchoredElement.querySelector(
        `[data-anchored-element="${anchorId}]`,
      );

      if (closestTriggerElement) {
        const { top: closestTriggerElementTop, right: closestTriggerElementRight } =
          getOffsetFromParent({
            parentElement: closestAnchoredElement,
            element: closestTriggerElement,
          });

        finalTop = closestTriggerElementTop - anchoredElementHeight - arrowHeight;
        finalLeft = closestTriggerElementRight - anchoredElementWidth;
      }
    }
  }

  return { top: finalTop, left: finalLeft, isInsideAnchoredElement };
};
