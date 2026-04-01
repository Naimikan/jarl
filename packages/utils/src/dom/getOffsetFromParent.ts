export interface GetOffsetFromParent {
  element: HTMLElement;
  parentElement: HTMLElement;
}

export const getOffsetFromParent = ({ parentElement, element }: GetOffsetFromParent) => {
  const parentElementPosition = parentElement.getBoundingClientRect();
  const elementPosition = element.getBoundingClientRect();

  const { borderTopWidth, borderLeftWidth } = window.getComputedStyle(parentElement);

  const borderTopOffset = parseInt(borderTopWidth, 10) ?? 0;
  const borderLeftOffset = parseInt(borderLeftWidth, 10) ?? 0;

  const top = elementPosition.top - parentElementPosition.top - borderTopOffset;
  const bottom = top + elementPosition.height;
  const left = elementPosition.left - parentElementPosition.left - borderLeftOffset;
  const right = left + elementPosition.width;

  return {
    top,
    bottom,
    left,
    right,
    width: elementPosition.width,
    height: elementPosition.height,
  };
};
