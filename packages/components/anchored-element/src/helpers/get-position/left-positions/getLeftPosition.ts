import { getOffsetFromParent } from '@jarl/utils';

import { POSITIONS } from '../../../constants';
import { getArrowHeight } from '../../get-arrow-height';
import type { GetBasicPositionParams } from '../index.types';

type GetLeftPositionParams = Omit<GetBasicPositionParams, 'position' | 'sameWithAsTrigger'>;

export const getLeftPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  boundary,
  withAppendTo,
}: GetLeftPositionParams) => {
  let finalTop = null;
  let finalLeft = null;
  let isInsideAnchoredElement = false;

  if (anchoredElement && triggerElement) {
    const { anchorId } = anchoredElement.dataset;
    const { height: anchoredElementHeight, width: anchoredElementWidth } =
      anchoredElement.getBoundingClientRect();
    const arrowHeight = getArrowHeight({ arrowElement, position: POSITIONS.LEFT });

    let triggerElementTop: number;
    let triggerElementLeft: number;
    let triggerElementHeight: number;
    let scrollVertical = window.scrollY;
    let scrollHorizontal = window.scrollX;

    ({
      top: triggerElementTop,
      left: triggerElementLeft,
      height: triggerElementHeight,
    } = triggerElement.getBoundingClientRect());

    if (withAppendTo) {
      if (boundary) {
        ({
          top: triggerElementTop,
          left: triggerElementLeft,
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
          left: triggerElementLeft,
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
      finalLeft = triggerElementLeft - arrowHeight - anchoredElementWidth + scrollHorizontal;
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

        finalTop =
          closestTriggerElementTop + closestTriggerElementHeight / 2 - anchoredElementHeight / 2;
        finalLeft = closestTriggerElementLeft - anchoredElementWidth - arrowHeight;
      }
    }
  }

  return { top: finalTop, left: finalLeft, isInsideAnchoredElement };
};
