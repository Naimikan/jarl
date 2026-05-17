import { fn } from 'storybook/test';

import { Button } from '@jarl/button';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ClassAttributes, HTMLAttributes } from 'react';
import type { JSX } from 'react/jsx-runtime';

const Test = (
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>,
) => <div {...props} />;

const meta = {
  title: 'JARL/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    children: 'Button',
    disabled: false,
    focusable: true,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const As: Story = {
  args: {
    as: Test,
  },
};
