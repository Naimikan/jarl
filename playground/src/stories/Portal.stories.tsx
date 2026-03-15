import { Portal } from '@jarl/portal';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'JARL/Portal',
  component: Portal,
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 'portal-id',
    'data-my-attr': 'WAWAO',
    children: <span>Content inside portal</span>,
  },
} satisfies Meta<typeof Portal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Refs: Story = {
  args: {
    ref: (node: HTMLDivElement) => {
      console.log(node);
    },
  },
};

export const Nested: Story = {
  render: () => {
    return (
      <Portal id="first-portal">
        <div>Something inside first portal</div>
        <Portal id="second-portal">
          <div>Something inside second portal</div>
          <Portal id="third-portal">
            <div>Something inside third portal</div>
          </Portal>
        </Portal>
      </Portal>
    );
  },
};
