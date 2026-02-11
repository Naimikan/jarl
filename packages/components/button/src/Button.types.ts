import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

interface ButtonBaseProps {
  children: ReactNode;
  focusable?: boolean;
}

export type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps &
  Omit<ComponentPropsWithRef<T>, keyof ButtonBaseProps | 'as'> & {
    as?: T;
  };
