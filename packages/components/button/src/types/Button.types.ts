import type { AriaAttributes, ComponentPropsWithRef, ElementType, PropsWithChildren } from 'react';

import type { DataAttributes } from '@jarl/utils';

interface ButtonBaseProps<Variant extends string = string, Color extends string = string>
  extends AriaAttributes,
    DataAttributes {
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
