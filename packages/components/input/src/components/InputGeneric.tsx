import { type ChangeEvent, useCallback } from 'react';

import { useControlledField } from '@jarl/react-utils';
import { isDefinedAndNotNull } from '@jarl/utils';

import type { InputGenericProps } from '../Input.types';
import { BaseInput } from './BaseInput';

export const InputGeneric = ({
  value,
  defaultValue,
  onChange,
  name,
  ...otherProps
}: InputGenericProps) => {
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

InputGeneric.displayName = 'Jarl.InputGeneric';
