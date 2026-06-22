import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import { Input, type OnChangeNumberParams, type RenderFixNumberPropParam } from '@jarl/input';

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

export const HideStepper: Story = {
  args: {
    hideStepper: true,
  },
};

export const MinAndMax: Story = {
  args: {
    min: 0,
    max: 100,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
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

export const EnableWheelChange: Story = {
  args: {
    enableWheelChange: true,
  },
};

export const DisplayFormatter: Story = {
  args: {
    displayFormatter: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }),
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<number | undefined>();

    const onChange = useCallback(({ value }: OnChangeNumberParams) => {
      setValue(value);
    }, []);

    return <Input onChange={onChange} type="number" value={value} />;
  },
};

export const Prefix: Story = {
  args: {
    renderPrefix: () => <span>$</span>,
  },
};

export const Suffix: Story = {
  args: {
    renderSuffix: () => <span>$</span>,
  },
};

export const CustomControls: Story = {
  args: {
    renderPrefix: ({ inputId, decrease }: RenderFixNumberPropParam) => (
      <button
        aria-controls={inputId}
        aria-label="Increase"
        className="jarl-input-number__stepper-button"
        onClick={() => decrease?.()}
        tabIndex={-1}
        type="button"
      >
        -
      </button>
    ),
    renderSuffix: ({ inputId, increase }: RenderFixNumberPropParam) => (
      <button
        aria-controls={inputId}
        aria-label="Increase"
        className="jarl-input-number__stepper-button"
        onClick={() => increase?.()}
        tabIndex={-1}
        type="button"
      >
        +
      </button>
    ),
  },
};
