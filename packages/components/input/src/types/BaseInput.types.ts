import type { ReactNode } from 'react';

import type { DataAttributes } from '@jarl/utils';

import type { InputTypes } from '../constants';

export type InputType = (typeof InputTypes)[keyof typeof InputTypes];

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
