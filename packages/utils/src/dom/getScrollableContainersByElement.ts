import { getClosestScrollableElement } from './getClosestScrollableElement';

export type GetScrollableContainersByElementReturn = HTMLElement[];

export const getScrollableContainersByElement = (
  element: HTMLElement | null,
): GetScrollableContainersByElementReturn => {
  const closestScrollableContainer = getClosestScrollableElement(element);

  if (closestScrollableContainer) {
    return [
      closestScrollableContainer,
      ...getScrollableContainersByElement(closestScrollableContainer).flat(),
    ].filter((eachClosestScrollableContainer) => !!eachClosestScrollableContainer);
  }

  return [];
};
