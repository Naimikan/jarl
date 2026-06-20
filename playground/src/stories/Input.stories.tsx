import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@jarl/input';

const meta = {
  title: 'JARL/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
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

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const FocusAndBlur: Story = {
  args: {
    onFocus: () => console.log('Focused'),
    onBlur: () => console.log('Blurred'),
  },
};

export const Prefix: Story = {
  args: {
    renderPrefix: () => <span>$</span>,
  },
};

export const Suffix: Story = {
  args: {
    renderSuffix: () => <span>Suffix</span>,
  },
};
