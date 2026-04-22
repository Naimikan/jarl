export const getClosestScrollableElement = (element: HTMLElement | null) => {
  if (element && element !== document.documentElement) {
    let { parentElement } = element;

    while (parentElement) {
      const { overflow } = window.getComputedStyle(parentElement);

      if (overflow.split(' ').some((eachOverflow) => ['auto', 'scroll'].includes(eachOverflow))) {
        return parentElement;
      }

      parentElement = parentElement.parentElement;
    }

    return document.documentElement;
  }

  return null;
};
