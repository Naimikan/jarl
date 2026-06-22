import type { ReactNode } from 'react';

import type { DataAttributes } from '@jarl/utils';

import type { InputTypes } from './constants';

export type InputType = (typeof InputTypes)[keyof typeof InputTypes];

/* Base types */
export interface RenderFixPropParams {
  disabled?: BaseInputProps['disabled'];
  invalid?: BaseInputProps['invalid'];
  readOnly?: BaseInputProps['readOnly'];
}

export type RenderFixProp = (params: RenderFixPropParams) => ReactNode;

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

/* Generic types */
export interface OnChangeGenericParams {
  name: BaseInputProps['name'];
  value: BaseInputProps['value'];
}

export type InputGenericProps = Omit<BaseInputProps, 'onChange'> & {
  onChange?: (params: OnChangeGenericParams) => void;
};

/* Number types */
export interface OnChangeNumberParams {
  name: InputNumberProps['name'];
  value: InputNumberProps['value'];
}

export interface RenderFixNumberPropParam extends RenderFixPropParams {
  decrease?: (forceMin?: boolean) => void;
  increase?: (forceMax?: boolean) => void;
  inputId?: string;
  max?: number;
  min?: number;
}

export type RenderFixNumberProp = (params: RenderFixNumberPropParam) => ReactNode;

export type InputNumberProps = Omit<
  InputGenericProps,
  | 'type'
  | 'role'
  | 'inputMode'
  | 'defaultValue'
  | 'value'
  | 'min'
  | 'max'
  | 'step'
  | 'onChange'
  | 'renderPrefix'
  | 'renderSuffix'
> & {
  inputMode?: 'numeric' | 'decimal';
  defaultValue?: number;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  hideStepper?: boolean;
  enableWheelChange?: boolean;
  displayFormatter?: Intl.NumberFormat;
  renderPrefix?: RenderFixNumberProp;
  renderSuffix?: RenderFixNumberProp;
  onChange?: (params: OnChangeNumberParams) => void;
};

/* Full types */

type InputTypeProp = Pick<InputGenericProps, 'type'>;

export type InputProps = InputTypeProp & (Omit<InputGenericProps, 'type'> | InputNumberProps);
