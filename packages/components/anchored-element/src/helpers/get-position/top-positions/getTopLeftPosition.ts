import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';
import type { GetBasicPositionParams } from '../index.types';

type GetTopLeftPositionParams = Omit<GetBasicPositionParams, 'position' | 'sameWithAsTrigger'>;

export const getTopLeftPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
}: GetTopLeftPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { height: anchoredElementHeight } = anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.TOP_LEFT });

    let triggerElementTop: number;
    let triggerElementLeft: number;
    let scrollVertical = window.scrollY;
    let scrollHorizontal = window.scrollX;

    ({ top: triggerElementTop, left: triggerElementLeft } = triggerElement.getBoundingClientRect());

    if (withAppendTo) {
      if (boundary) {
        ({ top: triggerElementTop, left: triggerElementLeft } = getOffsetFromParent({
          parentElement: boundary,
          element: triggerElement,
        }));
        scrollVertical = boundary.scrollTop;
        scrollHorizontal = boundary.scrollLeft;
      } else if (triggerElement.parentElement) {
        ({ top: triggerElementTop, left: triggerElementLeft } = getOffsetFromParent({
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
      finalLeft = triggerElementLeft + scrollHorizontal;
    } else if (closestAnchoredElement) {
      isInsideAnchoredElement = true;

      // Todo: check if is inside a dialog

      const closestTriggerElement: HTMLElement | null = closestAnchoredElement.querySelector(
        `[data-anchored-element="${anchorId}]`,
      );

      if (closestTriggerElement) {
        const { top: closestTriggerElementTop, left: closestTriggerElementLeft } =
          getOffsetFromParent({
            parentElement: closestAnchoredElement,
            element: closestTriggerElement,
          });

        finalTop = closestTriggerElementTop - anchoredElementHeight - arrowHeight;
        finalLeft = closestTriggerElementLeft;
      }
    }
  }

  return { top: finalTop, left: finalLeft, isInsideAnchoredElement };
};
