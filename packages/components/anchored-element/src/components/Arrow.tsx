import classNames from 'classnames';

import type { ComponentPropsWithRef } from 'react';

import './Arrow.styles.css';

interface ArrowProps extends ComponentPropsWithRef<'div'> {
  className?: string;
}

export const Arrow = ({ ref, className, ...props }: ArrowProps) => (
  <div className={classNames('jarl-anchored-element__arrow', className)} ref={ref} {...props} />
);
