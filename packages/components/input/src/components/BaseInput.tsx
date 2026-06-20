import { type ChangeEvent, useCallback } from 'react';

import { useAriaAttributes, useDataAttributes, useFocusable } from '@jarl/react-utils';
import { cx } from '@jarl/utils';

import type { BaseInputProps } from '../Input.types';

import './BaseInput.styles.css';

export const BaseInput = ({
  inputClassName,
  containerClassName,
  invalid,
  ref,
  focusable,
  disabled,
  value,
  readOnly,
  renderPrefix,
  renderSuffix,
  onChange,
  ...inputProps
}: BaseInputProps) => {
  const ariaAttributes = useAriaAttributes(inputProps, ['aria-disabled', 'aria-invalid']);
  const dataAttributes = useDataAttributes(inputProps);

  const inputFieldFocusableProps = useFocusable('input', {
    disabled,
    focusable,
  });

  const inputContainerFocusableProps = {
    'aria-disabled':
      inputFieldFocusableProps['aria-disabled'] || inputFieldFocusableProps.disabled || undefined,
    tabIndex: inputFieldFocusableProps['aria-disabled'] ? 0 : undefined,
  };

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange?.(event);
      }
    },
    [disabled, onChange],
  );

  return (
    <div className={cx('jarl-input', containerClassName)} {...inputContainerFocusableProps}>
      {renderPrefix?.({
        disabled,
        invalid,
        readOnly,
      })}
      <input
        className={cx('jarl-input__field', inputClassName)}
        ref={ref}
        {...ariaAttributes}
        {...dataAttributes}
        {...inputFieldFocusableProps}
        {...inputProps}
        aria-invalid={invalid ? true : undefined}
        onChange={changeHandler}
        readOnly={readOnly ? true : undefined}
        value={value}
      />
      {renderSuffix?.({
        disabled,
        invalid,
        readOnly,
      })}
    </div>
  );
};

BaseInput.displayName = 'Jarl.BaseInput';
