import { type ChangeEvent, useCallback, useId } from 'react';

import { useControlledField, useFocusable } from '@jarl/react-utils';
import { cx } from '@jarl/utils';

import { Checkmark } from './components/Checkmark';
import { Positions } from './constants';

import './Checkbox.styles.css';

import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = ({
  as: CustomComponent,
  className,
  children,
  checked,
  defaultChecked,
  ...props
}: CheckboxProps) => {
  const {
    disabled,
    focusable,
    invalid,
    name,
    position = Positions.right,
    indeterminate = false,
    onChange,
  } = props;

  const checkboxId = useId();
  const checkboxInputId = `${checkboxId}:input`;
  const checkboxMarkId = `${checkboxId}:mark`;
  const checkboxLabelId = `${checkboxId}:label`;

  const focusableProps = useFocusable('input', {
    disabled,
    focusable,
  });

  const { isControlledField, fieldValue, setFieldValue } = useControlledField<boolean | undefined>({
    value: checked,
    defaultValue: defaultChecked,
    initialitator: () => {
      if (typeof defaultChecked !== 'undefined' && defaultChecked !== null) {
        return defaultChecked;
      }

      if (typeof checked !== 'undefined' && checked !== null) {
        return checked;
      }

      return false;
    },
  });

  const changeHandler = useCallback(
    (event: ChangeEvent) => {
      if (!disabled) {
        const newCheckedValue = !fieldValue;

        if (!isControlledField) {
          setFieldValue(newCheckedValue);
        }

        onChange?.({ checked: newCheckedValue, name, event });
      }
    },
    [disabled, fieldValue, isControlledField, setFieldValue, name, onChange],
  );

  return (
    <label className={cx('jarl-checkbox', className)} data-position={position} id={checkboxId}>
      <input
        aria-checked={indeterminate && fieldValue ? 'mixed' : undefined}
        aria-invalid={invalid || undefined}
        aria-labelledby={checkboxLabelId}
        checked={fieldValue}
        className="jarl-checkbox__input"
        id={checkboxInputId}
        name={name}
        onChange={changeHandler}
        type="checkbox"
        {...focusableProps}
      />
      {typeof CustomComponent !== 'undefined' && CustomComponent !== null ? (
        <CustomComponent
          checkboxId={checkboxId}
          checked={fieldValue}
          checkmarkId={checkboxMarkId}
          inputId={checkboxInputId}
          labelId={checkboxLabelId}
          {...props}
        >
          {children}
        </CustomComponent>
      ) : (
        <>
          <Checkmark
            checked={fieldValue}
            id={checkboxMarkId}
            indeterminate={indeterminate}
            invalid={invalid}
          />
          <span className="jarl-checkbox__label" id={checkboxLabelId}>
            {children}
          </span>
        </>
      )}
    </label>
  );
};

Checkbox.displayName = 'Jarl.Checkbox';

Checkbox.Positions = Positions;

Checkbox.Checkmark = Checkmark;
