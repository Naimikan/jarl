import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type WheelEvent,
} from 'react';

import { useControlledField } from '@jarl/react-utils';
import { isDefined, isDefinedAndNotNull } from '@jarl/utils';

import { getPrecisionByNumber } from '../helpers/getPrecisionByNumber';
import { getValidatedValue } from '../helpers/getValidatedValue';
import { isIncompleteNumericValue } from '../helpers/isIncompleteNumericValue';
import { sanitizeInputValue } from '../helpers/sanitizeNumericValue';
import type { InputNumberProps } from '../Input.types';
import { BaseInput } from './BaseInput';
import { InputNumberSuffix } from './InputNumberSuffix';

export const InputNumber = ({
  inputMode = 'numeric',
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  autoComplete = 'off',
  spellCheck = 'true',
  disabled,
  step = 1,
  value,
  defaultValue,
  enableWheelChange = false,
  id,
  name,
  hideStepper = false,
  invalid,
  readOnly,
  displayFormatter,
  renderPrefix,
  renderSuffix,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  ...otherProps
}: InputNumberProps) => {
  const defaultId = useId();
  const idToUse = id || defaultId;

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
          newValue = parseFloat(((fieldValue ?? 0) + step).toFixed(precisionToUse));

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
      isControlledField,
      precisionToUse,
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
          newValue = parseFloat(((fieldValue ?? 0) - step).toFixed(precisionToUse));

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
        const currentInputValue = parseFloat(sanitizedValue);
        const validatedValue = getValidatedValue({ value: currentInputValue, min, max });

        if (fieldValue !== validatedValue) {
          if (!isControlledField) {
            setFieldValue(validatedValue);
          }

          if (isDefined(validatedValue)) {
            setInputDisplayValue(validatedValue.toFixed(precisionToUse));
          }

          onChange?.({ value: validatedValue, name });
        } else if (isDefined(validatedValue)) {
          setInputDisplayValue(validatedValue.toFixed(precisionToUse));
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
      const isUpArrowPressed = event.key === 'ArrowUp';
      const isDownArrowPressed = event.key === 'ArrowDown';
      const isHomePressed = event.key === 'Home';
      const isEndPressed = event.key === 'End';

      if (isUpArrowPressed || isDownArrowPressed || isHomePressed || isEndPressed) {
        event.preventDefault();

        if (isUpArrowPressed) {
          increase();
        }

        if (isDownArrowPressed) {
          decrease();
        }

        if (isHomePressed && isDefinedAndNotNull(min)) {
          decrease(true);
        }

        if (isEndPressed && isDefinedAndNotNull(max)) {
          increase(true);
        }
      }

      onKeyDown?.(event);
    },
    [increase, decrease, onKeyDown, min, max],
  );

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLInputElement>) => {
      if (!enableWheelChange || disabled) {
        return;
      }

      event.preventDefault();

      if (event.deltaY < 0) {
        increase();
      } else {
        decrease();
      }
    },
    [enableWheelChange, disabled, increase, decrease],
  );

  const renderPrefixToUse = useMemo(() => {
    const inputId = `${idToUse}:input`;

    if (isDefinedAndNotNull(renderPrefix)) {
      return () =>
        renderPrefix({
          disabled,
          readOnly,
          invalid,
          min,
          max,
          inputId,
          increase,
          decrease,
        });
    }

    return () => null;
  }, [disabled, readOnly, min, max, idToUse, invalid, renderPrefix, increase, decrease]);

  const renderSuffixToUse = useMemo(() => {
    const inputId = `${idToUse}:input`;

    if (isDefinedAndNotNull(renderSuffix)) {
      return () =>
        renderSuffix({
          disabled,
          readOnly,
          invalid,
          min,
          max,
          inputId,
          increase,
          decrease,
        });
    }

    if (hideStepper || readOnly || disabled) {
      return () => null;
    }

    return () => (
      <InputNumberSuffix
        currentValue={fieldValue}
        decrease={decrease}
        increase={increase}
        inputId={inputId}
        max={max}
        min={min}
      />
    );
  }, [
    hideStepper,
    disabled,
    readOnly,
    fieldValue,
    min,
    max,
    idToUse,
    invalid,
    renderSuffix,
    increase,
    decrease,
  ]);

  useEffect(() => {
    if (isFocused) {
      return;
    }

    setInputDisplayValue(isDefinedAndNotNull(fieldValue) ? fieldValue.toFixed(precisionToUse) : '');
  }, [fieldValue, precisionToUse, isFocused]);

  return (
    <BaseInput
      aria-valuemax={max !== Number.MAX_SAFE_INTEGER ? max : undefined}
      aria-valuemin={min !== Number.MIN_SAFE_INTEGER ? min : undefined}
      aria-valuenow={fieldValue}
      aria-valuetext={
        fieldValue !== undefined
          ? !isFocused && displayFormatter && fieldValue !== undefined
            ? displayFormatter.format(fieldValue)
            : inputDisplayValue
          : undefined
      }
      autoComplete={autoComplete}
      containerClassName="jarl-input-number"
      disabled={disabled}
      id={idToUse}
      inputMode={inputMode}
      invalid={invalid}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeydown}
      onWheel={handleWheel}
      readOnly={readOnly}
      renderPrefix={renderPrefixToUse}
      renderSuffix={renderSuffixToUse}
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

InputNumber.displayName = 'Jarl.InputNumber';
