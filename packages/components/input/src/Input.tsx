import { InputGeneric } from './components/InputGeneric';
import { InputNumber } from './components/InputNumber';
import { InputTypes } from './constants';
import type { InputNumberProps, InputProps } from './Input.types';

export const Input = ({ type, ...otherProps }: InputProps) => {
  if (type === InputTypes.number) {
    return <InputNumber {...(otherProps as InputNumberProps)} />;
  }

  return <InputGeneric type={type} {...otherProps} />;
};
