import type { ReactNode } from 'react';

import type { RenderFixPropParams } from './BaseInput.types';
import type { InputProps } from './Input.types';

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
  InputProps,
  | 'type'
  | 'role'
  | 'inputMode'
  | 'defaultChecked'
  | 'checked'
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
