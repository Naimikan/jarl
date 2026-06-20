import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@jarl/input';

const meta = {
  title: 'JARL/InputNumber',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    type: 'number',
    name: 'input-number',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue: 10,
  },
};

export const MinAndMax: Story = {
  args: {
    min: 0,
    max: 100,
  },
};

export const Step: Story = {
  args: {
    step: 5,
  },
};

export const StepWithDecimals: Story = {
  args: {
    step: 0.01,
  },
};

export const DisplayFormatter: Story = {
  args: {
    displayFormatter: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }),
  },
};
