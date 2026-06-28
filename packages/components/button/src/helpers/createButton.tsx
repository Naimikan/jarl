import type { ElementType } from 'react';

import { Button } from '../components/Button';
import type { ButtonProps } from '../types/Button.types';

export const createButton = <Variant extends string = string, Color extends string = string>() => {
  const TypedButton = <T extends ElementType = 'button'>(props: ButtonProps<T, Variant, Color>) => (
    <Button {...props} />
  );

  TypedButton.displayName = Button.displayName;

  return TypedButton;
};
