import classNames from 'classnames';

import { DEFAULT_TAG } from './constants';
import { useButton } from './hooks/useButton';

import type { ElementType } from 'react';

import type { ButtonProps } from './Button.types';

import './Button.styles.css';

export const Button = <T extends ElementType = typeof DEFAULT_TAG>({
  as,
  children,
  className,
  ref,
  ...props
}: ButtonProps<T>) => {
  const ComponentTag = as || DEFAULT_TAG;

  const buttonProps = useButton(ComponentTag, props);

  return (
    <ComponentTag className={classNames('jarl-button', className)} ref={ref} {...buttonProps}>
      {children}
    </ComponentTag>
  );
};

Button.displayName = 'Jarl.Button';
