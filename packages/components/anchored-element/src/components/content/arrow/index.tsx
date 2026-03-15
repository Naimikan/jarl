import type { ComponentPropsWithRef } from 'react';

interface ArrowProps extends ComponentPropsWithRef<'div'> {
  className?: string;
}

export const Arrow = ({ ref, className, ...props }: ArrowProps) => (
  <div className={className} ref={ref} {...props} />
);
