import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Checkbox, type CheckboxCustomComponentProps } from '@jarl/checkbox';

const Test = ({
  checked,
  children,
  disabled,
  indeterminate,
  labelId,
  checkmarkId,
  invalid,
}: CheckboxCustomComponentProps) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      opacity: disabled ? 0.5 : 1,
      outline: '2px dashed hotpink',
      padding: 4,
    }}
  >
    <span style={{ fontSize: 10, color: 'hotpink' }}>
      [{checked ? 'checked' : 'unchecked'}
      {indeterminate ? ', indeterminate' : ''}]
    </span>
    <Checkbox.Checkmark
      checked={checked}
      id={checkmarkId}
      indeterminate={indeterminate}
      invalid={invalid}
    />
    <span id={labelId}>{children}</span>
  </div>
);

const meta = {
  title: 'JARL/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: fn(),
    children: 'Checkbox content',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const Positions: Story = {
  args: {
    position: 'right',
  },
  argTypes: {
    position: { control: 'select', options: Object.values(Checkbox.Positions) },
  },
};

export const CustomComponent: Story = {
  args: {
    as: Test,
  },
};
