const dialogSelectors = ['[role="dialog"]', '[role="alertdialog"]'];

export const getClosestOpenedDialog = (rootElement?: HTMLElement | null): HTMLElement => {
  const finalRootElement = rootElement ?? document.body;

  const dialogOpened = finalRootElement.querySelector<HTMLElement>(dialogSelectors.join(','));

  if (dialogOpened) {
    const nestedDialog = dialogOpened.querySelector<HTMLElement>(dialogSelectors.join(','));

    if (nestedDialog) {
      return getClosestOpenedDialog(nestedDialog);
    }

    return dialogOpened;
  }

  return finalRootElement;
};
