import { useState } from 'react';

import { AnchoredElement } from '@jarl/anchored-element';
import { Button } from '@jarl/button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'JARL/AnchoredElement',
  component: AnchoredElement,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AnchoredElement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <AnchoredElement content={'Anchored content'}>
        <Button>Marta</Button>
      </AnchoredElement>
    );
  },
};

export const WithArrow: Story = {
  render: () => {
    return (
      <AnchoredElement content={'Anchored content'} interactive withArrow>
        <Button>Click</Button>
      </AnchoredElement>
    );
  },
};

export const Trigger: Story = {
  render: () => {
    return (
      <AnchoredElement content={'Anchored content'} triggerEvents="click">
        <Button>Click</Button>
      </AnchoredElement>
    );
  },
};

export const Positions: Story = {
  args: {
    position: AnchoredElement.POSITIONS.TOP,
  },
  argTypes: {
    position: { control: 'select', options: Object.values(AnchoredElement.POSITIONS) },
  },
  render: (args) => {
    return (
      <AnchoredElement content={'Anchored content'} position={args.position} withArrow>
        <Button>Click</Button>
      </AnchoredElement>
    );
  },
};

export const Delay: Story = {
  render: () => {
    return (
      <AnchoredElement content={'Anchored content'} delay={200} position="top_left">
        <Button>Click</Button>
      </AnchoredElement>
    );
  },
};

export const DelayWithArray: Story = {
  render: () => {
    return (
      <AnchoredElement content={'Anchored content'} delay={[750, 500]} position="top_left">
        <Button>Click</Button>
      </AnchoredElement>
    );
  },
};

export const Contained: Story = {
  render: () => {
    const [htmlElement, setHtmlElement] = useState<HTMLElement>();
    const [opened, setOpened] = useState(false);

    return (
      <div
        ref={(node) => setHtmlElement(node as HTMLElement)}
        style={{
          border: '1px solid black',
          position: 'relative',
          width: '500px',
          height: '200px',
          overflowY: 'scroll',
        }}
      >
        <div style={{ marginBottom: '250px' }}>Scroll down</div>
        <AnchoredElement
          avoidCloseOnClickOutside
          boundary={htmlElement}
          content={'Anchored content'}
          onClosed={() => setOpened(false)}
          onPositionChanged={console.log}
          opened={opened}
          position="top_left"
          triggerEvents="manual"
        >
          <Button onClick={() => setOpened(true)}>Click</Button>
        </AnchoredElement>
        <div style={{ marginTop: '250px' }}>Scroll up</div>
      </div>
    );
  },
};
