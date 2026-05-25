import { fn } from 'storybook/test';

import { Input } from '@jarl/input';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'JARL/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    name: 'input',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: 'Text here...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisableAndFocusable: Story = {
  args: {
    disabled: true,
    focusable: true,
  },
};
