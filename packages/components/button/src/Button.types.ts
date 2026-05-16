import type { ComponentPropsWithRef, ElementType, PropsWithChildren } from 'react';

interface ButtonBaseProps {
  focusable?: boolean;
}

export type ButtonProps<T extends ElementType = 'button'> = PropsWithChildren<ButtonBaseProps> &
  Omit<ComponentPropsWithRef<T>, keyof ButtonBaseProps | 'as'> & {
    as?: T;
  };
