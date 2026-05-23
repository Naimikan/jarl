export const getScrollbarWidthByElement = (rootElement: HTMLElement | null) => {
  if (!rootElement || typeof window === 'undefined') {
    return 0;
  }

  const isBodyOrHtmlElement =
    rootElement === document.body || rootElement === document.documentElement;

  if (isBodyOrHtmlElement) {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  return rootElement.offsetWidth - rootElement.clientWidth;
};
