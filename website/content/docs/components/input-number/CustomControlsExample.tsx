'use client';

import { InputNumber, type RenderFixNumberPropParam } from '@jarl/input';

export const CustomControlsExample = () => {
  return (
    <InputNumber
      name="my-input"
      renderPrefix={({ inputId, decrease }: RenderFixNumberPropParam) => (
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
      )}
      renderSuffix={({ inputId, increase }: RenderFixNumberPropParam) => (
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
      )}
    />
  );
};
