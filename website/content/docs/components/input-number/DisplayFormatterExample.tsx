'use client';

import { InputNumber } from '@jarl/input';

export const DisplayFormatterExample = () => {
  return (
    <InputNumber
      displayFormatter={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })}
      name="my-input"
    />
  );
};
