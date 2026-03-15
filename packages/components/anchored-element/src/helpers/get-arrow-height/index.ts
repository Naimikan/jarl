import { POSITIONS } from '../../constants/positions';

import type { Position } from '../../AnchoredElement.types';

type PositionWithoutAuto = Omit<Position, 'auto'>;

interface GetArrowHeightParams {
  arrowElement: HTMLDivElement | null;
  position: PositionWithoutAuto;
}

export const getArrowHeight = ({ arrowElement, position }: GetArrowHeightParams) => {
  if (arrowElement) {
    const arrowStyles = window.getComputedStyle(arrowElement);

    const parsedArrowHeight = parseInt(arrowStyles.height, 10);
    let parsedArrowBorder = 0;

    const leftPositions: Partial<PositionWithoutAuto>[] = [
      POSITIONS.TOP_LEFT,
      POSITIONS.TOP,
      POSITIONS.TOP_RIGHT,
    ];

    if (leftPositions.includes(position)) {
      parsedArrowBorder = parseInt(arrowStyles.borderBottom, 10);
    } else {
      parsedArrowBorder = parseInt(arrowStyles.borderTop, 10);
    }

    return parsedArrowHeight + parsedArrowBorder;
  }

  return 0;
};
