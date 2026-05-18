import { useEffect, useMemo, useState } from 'react';

import { isDefinedAndNotNull } from '@jarl/utils';

export interface IsControlledStateParams<T> {
  defaultValue: T;
  value: T;
}

export type UseControlledFieldParams<T> = IsControlledStateParams<T> & {
  initialitator: () => T;
};

export const isControlledState = <T>({ value, defaultValue }: IsControlledStateParams<T>) => {
  const isValueDefinedAndNotNull = isDefinedAndNotNull(value);
  const isDefaultValueDefinedAndNotNull = isDefinedAndNotNull(defaultValue);

  if (isValueDefinedAndNotNull && isDefaultValueDefinedAndNotNull) {
    console.error(`Warning: This component contains an input with both value and defaultValue props.
      Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both).
      Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components`);
    return false;
  }

  return isValueDefinedAndNotNull && !isDefaultValueDefinedAndNotNull;
};

export const useControlledField = <T>({
  value,
  defaultValue,
  initialitator,
}: UseControlledFieldParams<T>) => {
  const [fieldValue, setFieldValue] = useState<T>(initialitator());

  useEffect(() => {
    setFieldValue((prevState) => {
      let newFieldValue = prevState;

      if (isDefinedAndNotNull(defaultValue)) {
        newFieldValue = defaultValue;
      }

      if (isDefinedAndNotNull(value)) {
        newFieldValue = value;
      }

      return newFieldValue;
    });
  }, [defaultValue, value]);

  const isControlledField = useMemo(
    () => isControlledState({ value, defaultValue }),
    [value, defaultValue],
  );

  return {
    fieldValue,
    setFieldValue,
    isControlledField,
  };
};
