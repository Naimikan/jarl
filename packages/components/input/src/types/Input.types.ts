import type { BaseInputProps } from './BaseInput.types';

export interface OnChangeInputParams {
  name: BaseInputProps['name'];
  value: BaseInputProps['value'];
}

export type InputProps = Omit<BaseInputProps, 'onChange'> & {
  onChange?: (params: OnChangeInputParams) => void;
};
