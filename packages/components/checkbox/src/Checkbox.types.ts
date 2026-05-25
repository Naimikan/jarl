import type { AriaAttributes, ChangeEvent, ComponentType, ReactNode } from 'react';

import type { DataAttributes } from '@jarl/utils';

import type { Positions } from './constants';

export type Position = (typeof Positions)[keyof typeof Positions];

interface OnChangeParams {
  checked: CheckboxProps['checked'];
  event: ChangeEvent;
  name: CheckboxProps['name'];
}

export type CheckboxCustomComponentProps = Omit<
  CheckboxProps,
  'as' | 'checked' | 'defaultChecked' | 'focusable'
> & {
  checked: boolean | undefined;
  checkboxId: string;
  inputId: string;
  labelId: string;
  checkmarkId: string;
};

export interface CheckboxProps extends AriaAttributes, DataAttributes {
  as?: ComponentType<CheckboxCustomComponentProps>;
  checked?: boolean;
  children: ReactNode;
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  indeterminate?: boolean;
  invalid?: boolean;
  name?: string;
  onChange?: (params: OnChangeParams) => void;
  position?: Position;
}
