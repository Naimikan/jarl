import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useControlledField } from '@jarl/react-utils';
import { isDefined, isDefinedAndNotNull } from '@jarl/utils';

import { getPrecisionByNumber } from '../helpers/getPrecisionByNumber';
import { getValidatedValue } from '../helpers/getValidatedValue';
import { isIncompleteNumericValue } from '../helpers/isIncompleteNumericValue';
import { isNumericEvent } from '../helpers/isNumericEvent';
import { sanitizeInputValue } from '../helpers/sanitizeNumericValue';
import type { InputNumberProps } from '../Input.types';
import { BaseInput } from './BaseInput';

export const InputNumber = ({
  inputMode = 'numeric',
  min = -9007199254740991,
  max = 9007199254740991,
  autoComplete = 'off',
  spellCheck = 'false',
  disabled,
  step = 1,
  value,
  defaultValue,
  name,
  displayFormatter,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  ...otherProps
}: InputNumberProps) => {
  const [isFocused, setIsFocused] = useState(false);

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

  const precisionToUse = useMemo(() => {
    const precisionByStep = getPrecisionByNumber(step);
    const precisionByFieldValue = getPrecisionByNumber(fieldValue ?? 0);

    return Math.max(precisionByStep, precisionByFieldValue);
  }, [fieldValue, step]);

  const [inputDisplayValue, setInputDisplayValue] = useState<string | undefined>(() => {
    return isDefinedAndNotNull(fieldValue) ? fieldValue.toFixed(precisionToUse) : '';
  });

  const increase = useCallback(
    (forceMax = false) => {
      if (!disabled) {
        let newValue: number;

        if (forceMax) {
          newValue = max;
        } else {
          const precision = getPrecisionByNumber(step);
          newValue = parseFloat(((fieldValue ?? 0) + step).toFixed(precision));

          if (isDefinedAndNotNull(max) && newValue > max) {
            newValue = max;
          } else if (isDefinedAndNotNull(min) && newValue < min) {
            newValue = min;
          }
        }

        if (newValue !== fieldValue) {
          if (!isControlledField) {
            setFieldValue(newValue);
          }

          setInputDisplayValue(newValue.toFixed(precisionToUse));

          onChange?.({ value: newValue, name });
        }
      }
    },
    [
      fieldValue,
      precisionToUse,
      isControlledField,
      name,
      disabled,
      min,
      max,
      step,
      setFieldValue,
      onChange,
    ],
  );

  const decrease = useCallback(
    (forceMin = false) => {
      if (!disabled) {
        let newValue: number;

        if (forceMin) {
          newValue = min;
        } else {
          const precision = getPrecisionByNumber(step);

          newValue = parseFloat(((fieldValue ?? 0) - step).toFixed(precision));

          if (isDefinedAndNotNull(max) && newValue > max) {
            newValue = max;
          } else if (isDefinedAndNotNull(min) && newValue < min) {
            newValue = min;
          }
        }

        if (newValue !== fieldValue) {
          if (!isControlledField) {
            setFieldValue(newValue);
          }

          setInputDisplayValue(newValue.toFixed(precisionToUse));

          onChange?.({ value: newValue, name });
        }
      }
    },
    [
      fieldValue,
      precisionToUse,
      isControlledField,
      name,
      disabled,
      min,
      max,
      step,
      setFieldValue,
      onChange,
    ],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const sanitizedValue = sanitizeInputValue(value);

      setInputDisplayValue(sanitizedValue);

      if (isIncompleteNumericValue(sanitizedValue) || sanitizedValue === '') {
        if (!isControlledField) {
          setFieldValue(undefined);
        }

        onChange?.({ value: undefined, name });

        return;
      }

      const newValue = parseFloat(sanitizedValue);

      if (!Number.isNaN(newValue)) {
        if (!isControlledField) {
          setFieldValue(newValue);
        }

        onChange?.({ value: newValue, name });
      }
    },
    [isControlledField, name, setFieldValue, onChange],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);

      setIsFocused(true);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);

      setIsFocused(false);

      const sanitizedValue = sanitizeInputValue(event.target.value);

      if (isIncompleteNumericValue(sanitizedValue) || sanitizedValue === '') {
        if (!isControlledField) {
          setFieldValue(undefined);
        }

        onChange?.({ value: undefined, name });
      } else {
        const validatedValue = getValidatedValue({ value: fieldValue, min, max });

        if (fieldValue !== validatedValue) {
          if (!isControlledField) {
            setFieldValue(validatedValue);
          }

          if (isDefined(validatedValue)) {
            setInputDisplayValue(validatedValue.toFixed(precisionToUse));
          }

          onChange?.({ value: validatedValue, name });
        }
      }
    },
    [
      isControlledField,
      fieldValue,
      precisionToUse,
      min,
      max,
      name,
      setFieldValue,
      onBlur,
      onChange,
    ],
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!isNumericEvent(event)) {
        event.preventDefault();
      }

      const isUpArrowPressed = event.key === 'ArrowUp';
      const isDownArrowPressed = event.key === 'ArrowDown';
      const isHomePressed = event.key === 'Home';
      const isEndPressed = event.key === 'End';

      if (isUpArrowPressed || isDownArrowPressed || isHomePressed || isEndPressed) {
        if (isUpArrowPressed) {
          event.preventDefault();
          increase();
        } else if (isDownArrowPressed) {
          event.preventDefault();
          decrease();
        } else if (
          (isHomePressed && isDefinedAndNotNull(min)) ||
          (isEndPressed && isDefinedAndNotNull(max))
        ) {
          event.preventDefault();

          if (isHomePressed) {
            decrease(isHomePressed);
          } else if (isEndPressed) {
            increase(isEndPressed);
          }
        }
      }

      onKeyDown?.(event);
    },
    [increase, decrease, onKeyDown, min, max],
  );

  return (
    <BaseInput
      aria-valuemax={isDefinedAndNotNull(max) ? +max : undefined}
      aria-valuemin={isDefinedAndNotNull(min) ? +min : undefined}
      aria-valuenow={fieldValue}
      aria-valuetext={
        !isFocused && displayFormatter && fieldValue !== undefined
          ? displayFormatter.format(fieldValue)
          : inputDisplayValue
      }
      autoComplete={autoComplete}
      disabled={disabled}
      inputMode={inputMode}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeydown}
      role="spinbutton"
      spellCheck={spellCheck}
      type="text"
      value={
        !isFocused && displayFormatter && fieldValue !== undefined
          ? displayFormatter.format(fieldValue)
          : inputDisplayValue
      }
      {...otherProps}
    />
  );
};
