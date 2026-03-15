export interface IsElementVisibleInContainerParams {
  container: HTMLElement;
  element: HTMLElement;
}

export const isElementVisibleInContainer = ({
  element,
  container,
}: IsElementVisibleInContainerParams) => {
  const {
    top: elementTop,
    bottom: elementBottom,
    left: elementLeft,
    right: elementRight,
    width: elementWidth,
    height: elementHeight,
  } = element.getBoundingClientRect();

  const {
    top: containerTop,
    bottom: containerBottom,
    left: containerLeft,
    right: containerRight,
  } = container.getBoundingClientRect();

  const elementArea = elementWidth * elementHeight;

  if (elementArea === 0) {
    return false;
  }

  const horizontalIntersection = Math.max(
    0,
    Math.min(elementRight, containerRight) - Math.max(elementLeft, containerLeft),
  );

  const verticalIntersection = Math.max(
    0,
    Math.min(elementBottom, containerBottom) - Math.max(elementTop, containerTop),
  );

  const visibleArea = horizontalIntersection * verticalIntersection;
  const visibilityPercentage = (visibleArea / elementArea) * 100;

  return visibilityPercentage > 0;
};
