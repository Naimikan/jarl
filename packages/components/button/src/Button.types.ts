import type { ComponentPropsWithRef, ElementType, PropsWithChildren } from 'react';

interface ButtonBaseProps<Variant extends string = string, Color extends string = string> {
  color?: Color;
  focusable?: boolean;
  variant?: Variant;
}

export type ButtonProps<
  T extends ElementType = 'button',
  Variant extends string = string,
  Color extends string = string,
> = PropsWithChildren<ButtonBaseProps<Variant, Color>> &
  Omit<ComponentPropsWithRef<T>, keyof ButtonBaseProps | 'as'> & {
    as?: T;
  };
