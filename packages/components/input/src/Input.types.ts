import type { ReactNode } from 'react';

import type { DataAttributes } from '@jarl/utils';

import type { InputTypes } from './constants';

export type InputType = (typeof InputTypes)[keyof typeof InputTypes];

export interface OnChangeParams {
  name: BaseInputProps['name'];
  value: BaseInputProps['value'];
}

export interface RenderFixPropsParams {
  disabled?: BaseInputProps['disabled'];
  invalid?: BaseInputProps['invalid'];
  readOnly?: BaseInputProps['readOnly'];
}

export type RenderFixProp = (params: RenderFixPropsParams) => ReactNode;

export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  DataAttributes & {
    ref?: React.Ref<HTMLInputElement>;
    containerClassName?: string;
    inputClassName?: string;
    invalid?: boolean;
    focusable?: boolean;
    type?: InputType;
    renderPrefix?: RenderFixProp;
    renderSuffix?: RenderFixProp;
  };

export type InputGenericProps = Omit<BaseInputProps, 'onChange'> & {
  onChange?: (params: OnChangeParams) => void;
};

export type InputNumberProps = Omit<
  InputGenericProps,
  'type' | 'role' | 'inputMode' | 'defaultValue' | 'value' | 'min' | 'max' | 'step'
> & {
  inputMode?: 'numeric' | 'decimal';
  defaultValue?: number;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  displayFormatter?: Intl.NumberFormat;
};

export type InputProps = InputGenericProps | InputNumberProps;
