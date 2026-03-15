import { useFocusable } from '@jarl/react-utils';
import { cx } from '@jarl/styled-system/css';
import { button } from '@jarl/styled-system/recipes';

import type { ElementType } from 'react';

import type { ButtonProps } from './Button.types';

const DEFAULT_TAG = 'button';

export const Button = <T extends ElementType = typeof DEFAULT_TAG>({
  as,
  children,
  disabled,
  focusable,
  className,
  ref,
  ...props
}: ButtonProps<T>) => {
  const ComponentTag = as || DEFAULT_TAG;

  const focusableProps = useFocusable(ComponentTag, {
    disabled,
    focusable,
  });

  return (
    <ComponentTag className={cx(button(), className)} ref={ref} {...focusableProps} {...props}>
      {children}
    </ComponentTag>
  );
};

Button.displayName = 'Button';
