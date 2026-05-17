import {
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
  useCallback,
} from 'react';

import { useFocusable } from '@jarl/react-utils';

import type { ButtonProps } from '../Button.types';
import type { DEFAULT_TAG } from '../constants';

const NATIVE_INTERACTIVE_TAGS = new Set(['button', 'input', 'select', 'textarea']);
const SEMANTIC_TAGS = new Set(['a', 'area']);

const isNativeInteractive = (elementTag: ElementType): boolean =>
  typeof elementTag === 'string' && NATIVE_INTERACTIVE_TAGS.has(elementTag.toLowerCase());

const hasSelfSemantics = (elementTag: ElementType): boolean =>
  typeof elementTag === 'string' && SEMANTIC_TAGS.has(elementTag.toLowerCase());

export const useButton = <T extends ElementType = typeof DEFAULT_TAG>(
  elementTag: T,
  {
    disabled,
    focusable,
    onKeyDown: keyDownProp,
    onKeyUp: keyUpProp,
    onClick: onClickProp,
    ...props
  }: Omit<ButtonProps<T>, 'as' | 'className' | 'ref' | 'children'>,
) => {
  const focusableProps = useFocusable(elementTag, {
    disabled,
    focusable,
  });

  const clickHandler = useCallback(
    (event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
      if (!disabled) {
        onClickProp?.(event);
      }
    },
    [disabled, onClickProp],
  );

  const keyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        (event.currentTarget as HTMLElement).setAttribute('data-active', '');

        if (event.key === 'Enter') {
          event.currentTarget.click();
        }
      }

      keyDownProp?.(event);
    },
    [disabled, keyDownProp],
  );

  const keyUpHandler = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        (event.currentTarget as HTMLElement).removeAttribute('data-active');

        if (event.key === ' ') {
          event.currentTarget.click();
        }
      }

      keyUpProp?.(event);
    },
    [disabled, keyUpProp],
  );

  const commonButtonProps = {
    ...focusableProps,
    ...props,
  };

  return {
    ...(!(isNativeInteractive(elementTag) || hasSelfSemantics(elementTag)) && {
      role: 'button' as const,
    }),
    ...commonButtonProps,
    'data-disabled': disabled || undefined,
    onKeyDown: keyDownHandler,
    onKeyUp: keyUpHandler,
    onClick: clickHandler,
  };
};
