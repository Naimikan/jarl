import { cx } from '@jarl/utils';

import type { ComponentPropsWithRef } from 'react';

import './Arrow.styles.css';

interface ArrowProps extends ComponentPropsWithRef<'div'> {
  className?: string;
}

export const Arrow = ({ ref, className, ...props }: ArrowProps) => (
  <div className={cx('jarl-anchored-element__arrow', className)} ref={ref} {...props} />
);
