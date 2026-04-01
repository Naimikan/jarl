const focusableElementsSelectors = [
  'a[href]:not([disabled])',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([type="hidden"]):not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
  '[contenteditable="true"]',
  'details > summary:not([disabled])',
  'audio[controls]',
  'video[controls]',
  'iframe',
];

export const getFocusableElements = (rootElement?: HTMLElement | null) => {
  const rootElementToUse = rootElement ?? document.body;

  return rootElementToUse.querySelectorAll<HTMLElement>(focusableElementsSelectors.join(','));
};
