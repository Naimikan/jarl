import type { ElementType } from 'react';

export interface UseFocusableOtherParams {
  disabled?: boolean;
  focusable?: boolean;
}

export interface UseFocusableReturn {
  'aria-disabled': boolean;
  disabled: boolean | undefined;
  tabIndex: number | undefined;
}

const isNativeTabbable = (elementTag: string) =>
  ['button', 'input', 'select', 'textarea', 'a'].includes(elementTag.toLowerCase());

const supportsDisabledAttribute = (elementTag: string) =>
  ['button', 'input', 'select', 'textarea', 'fieldset', 'optgroup', 'option'].includes(
    elementTag.toLowerCase(),
  );

export const useFocusable = (
  elementTag: ElementType,
  { disabled = false, focusable }: UseFocusableOtherParams = {},
): UseFocusableReturn => {
  const nativeTabbable = isNativeTabbable(elementTag.toString());
  const supportsDisabled = supportsDisabledAttribute(elementTag.toString());

  const isCompletelyDisabled = disabled && focusable !== true;

  let tabIndex: number | undefined;

  if (isCompletelyDisabled) {
    if (nativeTabbable && !supportsDisabled) {
      tabIndex = -1;
    } else {
      tabIndex = undefined;
    }
  } else if (focusable === false) {
    tabIndex = -1;
  } else if (focusable === true) {
    if (nativeTabbable) {
      tabIndex = undefined;
    } else {
      tabIndex = 0;
    }
  } else if (nativeTabbable) {
    tabIndex = undefined;
  } else {
    tabIndex = 0;
  }

  return {
    tabIndex,
    disabled: supportsDisabled ? isCompletelyDisabled : undefined,
    'aria-disabled': disabled,
  };
};
