import { type ChangeEvent, useCallback } from 'react';

import { useControlledField } from '@jarl/react-utils';
import { isDefinedAndNotNull } from '@jarl/utils';

import type { InputProps } from '../../types/Input.types';
import { BaseInput } from '../BaseInput/BaseInput';

export const Input = ({ value, defaultValue, onChange, name, ...otherProps }: InputProps) => {
  const { isControlledField, fieldValue, setFieldValue } = useControlledField<
    typeof value | undefined
  >({
    value,
    defaultValue,
    initialitator: () => {
      if (isDefinedAndNotNull(defaultValue)) {
        return defaultValue;
      }

      if (isDefinedAndNotNull(value)) {
        return value;
      }

      return undefined;
    },
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (!isControlledField) {
        setFieldValue(value);
      }

      onChange?.({ value, name });
    },
    [isControlledField, setFieldValue, name, onChange],
  );

  return <BaseInput name={name} onChange={handleChange} value={fieldValue ?? ''} {...otherProps} />;
};

Input.displayName = 'Jarl.Input';
