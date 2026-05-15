import { isElementVisibleInContainer } from '@jarl/utils';

import { POSITIONS } from '../../constants';
import { getBottomLeftPosition } from './bottom-positions/getBottomLeftPosition';
import { getBottomPosition } from './bottom-positions/getBottomPosition';
import { getBottomRightPosition } from './bottom-positions/getBottomRightPosition';
import { getLeftBottomPosition } from './left-positions/getLeftBottomPosition';
import { getLeftPosition } from './left-positions/getLeftPosition';
import { getLeftTopPosition } from './left-positions/getLeftTopPosition';
import { getRightBottomPosition } from './right-positions/getRightBottomPosition';
import { getRightPosition } from './right-positions/getRightPosition';
import { getRightTopPosition } from './right-positions/getRightTopPosition';
import { getTopLeftPosition } from './top-positions/getTopLeftPosition';
import { getTopPosition } from './top-positions/getTopPosition';
import { getTopRightPosition } from './top-positions/getTopRightPosition';

import type { Position } from '../../AnchoredElement.types';
import type {
  CheckInsideBoundaryParams,
  CheckInsideViewportParams,
  GetBasicPositionParams,
  GetBasicPositionReturn,
  GetPositionParams,
  GetPositionReturn,
  IsInsideViewportOrBoundaryParams,
} from './index.types';

const checkInsideBoundary = ({
  anchoredElement,
  triggerElement,
  boundary,
  positionToCheck,
  withAppendTo,
}: CheckInsideBoundaryParams) => {
  if (anchoredElement && triggerElement && positionToCheck.top && positionToCheck.left) {
    const { width: anchoredElementWidth, height: anchoredElementHeight } =
      anchoredElement.getBoundingClientRect();

    if (boundary) {
      const {
        top: boundaryTop,
        left: boundaryLeft,
        width: boundaryWidth,
        height: boundaryHeight,
      } = boundary.getBoundingClientRect();

      if (withAppendTo) {
        const boundaryScrollVertical = boundary.scrollTop;
        const boundaryScrollHorizontal = boundary.scrollLeft;

        const topRelativeToBoundary = positionToCheck.top + boundaryTop - boundaryScrollVertical;
        const leftRelativeToBoundary =
          positionToCheck.left + boundaryLeft - boundaryScrollHorizontal;

        return (
          topRelativeToBoundary >= boundaryTop &&
          topRelativeToBoundary + anchoredElementHeight <= boundaryTop + boundaryHeight &&
          leftRelativeToBoundary >= boundaryLeft &&
          leftRelativeToBoundary + anchoredElementWidth <= boundaryLeft + boundaryWidth
        );
      }

      const topRelativeToViewport = boundaryTop + window.pageYOffset;
      const bottomRelativeToViewport = boundaryTop + boundaryHeight + window.pageYOffset;
      const leftRelataviteToViewport = boundaryLeft + window.pageXOffset;
      const rightRelativeToViewport = boundaryLeft + boundaryWidth + window.pageXOffset;

      return (
        positionToCheck.top >= topRelativeToViewport &&
        positionToCheck.top + anchoredElementHeight <= bottomRelativeToViewport &&
        positionToCheck.left >= leftRelataviteToViewport &&
        positionToCheck.left + anchoredElementWidth <= rightRelativeToViewport
      );
    }

    return false;
  }

  return false;
};

const checkInsideViewport = ({
  anchoredElement,
  triggerElement,
  positionToCheck,
}: CheckInsideViewportParams) => {
  if (anchoredElement && triggerElement && positionToCheck.top && positionToCheck.left) {
    const { width: anchoredElementWidth, height: anchoredElementHeight } =
      anchoredElement.getBoundingClientRect();

    let topToCheck = positionToCheck.top - window.scrollY;
    let leftToCheck = positionToCheck.left - window.scrollX;

    if (positionToCheck.isInsideAnchoredElement) {
      const closestAnchoredElement = triggerElement.closest('[data-anchor-id]');

      if (closestAnchoredElement) {
        const { top: closestAnchoredElementTop, left: closestAnchoredElementLeft } =
          closestAnchoredElement.getBoundingClientRect();

        topToCheck = closestAnchoredElementTop + positionToCheck.top;
        leftToCheck = closestAnchoredElementLeft + positionToCheck.left;
      }
    }

    return (
      topToCheck >= 0 &&
      topToCheck + anchoredElementHeight <= window.innerHeight &&
      leftToCheck >= 0 &&
      leftToCheck + anchoredElementWidth <= window.innerHeight
    );
  }

  return false;
};

const checkInsideViewportOrBoundary = ({
  anchoredElement,
  triggerElement,
  boundary,
  positionToCheck,
  withAppendTo,
}: IsInsideViewportOrBoundaryParams) => {
  if (anchoredElement && triggerElement) {
    if (boundary) {
      return checkInsideBoundary({
        anchoredElement,
        triggerElement,
        boundary,
        positionToCheck,
        withAppendTo,
      });
    }

    return checkInsideViewport({
      anchoredElement,
      triggerElement,
      positionToCheck,
    });
  }

  return false;
};

const getBasicPosition = ({
  anchoredElement,
  triggerElement,
  arrowElement,
  position,
  boundary,
  sameWithAsTrigger,
  withAppendTo,
}: GetBasicPositionParams): GetBasicPositionReturn => {
  const defaultPosition = { top: null, left: null, isInsideAnchoredElement: false };

  if (anchoredElement && triggerElement) {
    if (sameWithAsTrigger) {
      const { width: triggerElementWidth } = triggerElement.getBoundingClientRect();

      anchoredElement.style.width = `${triggerElementWidth}px`;
    }

    switch (position) {
      case POSITIONS.TOP_LEFT:
        return getTopLeftPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.TOP:
        return getTopPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
          sameWithAsTrigger,
        });

      case POSITIONS.TOP_RIGHT:
        return getTopRightPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.BOTTOM_LEFT:
        return getBottomLeftPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.BOTTOM:
        return getBottomPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
          sameWithAsTrigger,
        });

      case POSITIONS.BOTTOM_RIGHT:
        return getBottomRightPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.LEFT_BOTTOM:
        return getLeftBottomPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.LEFT:
        return getLeftPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.LEFT_TOP:
        return getLeftTopPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.RIGHT_BOTTOM:
        return getRightBottomPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.RIGHT:
        return getRightPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      case POSITIONS.RIGHT_TOP:
        return getRightTopPosition({
          anchoredElement,
          triggerElement,
          boundary,
          arrowElement,
          withAppendTo,
        });

      default:
        return defaultPosition;
    }
  }

  return defaultPosition;
};

export const getPosition = ({
  anchoredElement,
  anchoredElementContent,
  triggerElement,
  arrowElement,
  boundary,
  position,
  positionsChecked = [position],
  initialPosition = position,
  sameWithAsTrigger,
  forceOpenEvenNotFit = false,
  avoidPositionRecalculation = false,
  allowedPositions = sameWithAsTrigger
    ? [POSITIONS.BOTTOM, POSITIONS.TOP]
    : Object.values(POSITIONS),
  withAppendTo = false,
}: GetPositionParams): GetPositionReturn => {
  const basicPosition = getBasicPosition({
    anchoredElement,
    triggerElement,
    arrowElement,
    boundary,
    position,
    sameWithAsTrigger,
    withAppendTo,
  });

  const newPosition = {
    position,
    shouldHide: false,
    top: basicPosition.top,
    left: basicPosition.left,
    width: basicPosition.width,
    isInsideAnchoredElement: basicPosition.isInsideAnchoredElement,
    lastVisiblePosition: position,
  };

  if (newPosition.top !== null) {
    newPosition.top = Math.round(newPosition.top);
  }

  if (newPosition.left !== null) {
    newPosition.left = Math.round(newPosition.left);
  }

  if (newPosition.width) {
    newPosition.width = Math.round(newPosition.width);
  }

  const isInsideViewportOrBoundary = checkInsideViewportOrBoundary({
    anchoredElement,
    triggerElement,
    boundary,
    positionToCheck: newPosition,
    withAppendTo,
  });

  if (
    triggerElement?.parentElement &&
    !isElementVisibleInContainer({
      element: triggerElement,
      container: triggerElement.parentElement,
    })
  ) {
    newPosition.shouldHide = true;
  } else if (newPosition.top === null || newPosition.left === null || !isInsideViewportOrBoundary) {
    let allowedPositionsToCheck = allowedPositions;

    if (!avoidPositionRecalculation) {
      const [positionPrefix] = position.split('_');
      const positionsByPrefix = allowedPositionsToCheck.filter((eachPosition) =>
        eachPosition?.startsWith(positionPrefix as string),
      );

      const areAllPositionsByPrefixChecked = positionsByPrefix.every((eachPosition) =>
        positionsChecked.includes(eachPosition),
      );

      if (!areAllPositionsByPrefixChecked) {
        const positionByPrefixToBeChecked = positionsByPrefix.find(
          (eachPosition) => !positionsChecked.includes(eachPosition),
        );

        if (positionByPrefixToBeChecked) {
          return getPosition({
            anchoredElement,
            anchoredElementContent,
            triggerElement,
            arrowElement,
            allowedPositions: allowedPositionsToCheck,
            position: positionByPrefixToBeChecked,
            initialPosition,
            boundary,
            sameWithAsTrigger,
            withAppendTo,
            avoidPositionRecalculation,
            positionsChecked: [...positionsChecked, positionByPrefixToBeChecked],
          });
        }
      }

      if (sameWithAsTrigger) {
        allowedPositionsToCheck = [POSITIONS.BOTTOM, POSITIONS.TOP];
      }

      const firstPositionNotChecked = allowedPositionsToCheck.find(
        (eachPosition) => !positionsChecked.includes(eachPosition),
      );

      if (firstPositionNotChecked) {
        return getPosition({
          anchoredElement,
          anchoredElementContent,
          triggerElement,
          arrowElement,
          allowedPositions: allowedPositionsToCheck,
          position: firstPositionNotChecked,
          initialPosition,
          boundary,
          sameWithAsTrigger,
          withAppendTo,
          avoidPositionRecalculation,
          positionsChecked: [...positionsChecked, firstPositionNotChecked],
        });
      }
    }

    if (forceOpenEvenNotFit && anchoredElementContent) {
      const { lastVisiblePosition } = anchoredElementContent.dataset;
      let positionToUse = lastVisiblePosition as Position;

      if (!positionToUse) {
        positionToUse = initialPosition;
      }

      const openEvenNotFitPosition = getBasicPosition({
        anchoredElement,
        triggerElement,
        arrowElement,
        boundary,
        position,
        sameWithAsTrigger,
        withAppendTo,
      });

      newPosition.top = openEvenNotFitPosition.top;
      newPosition.left = openEvenNotFitPosition.left;
      newPosition.width = openEvenNotFitPosition.width;
      newPosition.isInsideAnchoredElement = openEvenNotFitPosition.isInsideAnchoredElement;
      newPosition.position = positionToUse;
      newPosition.lastVisiblePosition = positionToUse;
      newPosition.shouldHide = false;

      if (newPosition.top !== null) {
        newPosition.top = Math.round(newPosition.top);
      }

      if (newPosition.left !== null) {
        newPosition.left = Math.round(newPosition.left);
      }

      if (newPosition.width) {
        newPosition.width = Math.round(newPosition.width);
      }
    }
  } else {
    newPosition.lastVisiblePosition = position;
  }

  return newPosition;
};
