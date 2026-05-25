import { forwardRef } from 'react';

import { useFocusable } from '@jarl/react-utils';
import { cx } from '@jarl/utils';

import type { InputProps } from './Input.types';

import './Input.styles.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, className, type = 'text', disabled, focusable, invalid, autoComplete = 'off', ...props },
    ref,
  ) => {
    const inputFocusableProps = useFocusable('input', {
      disabled,
      focusable,
    });

    const containerFocusableProps = {
      'aria-disabled': inputFocusableProps['aria-disabled'] || undefined,
      tabIndex: inputFocusableProps['aria-disabled'] ? 0 : undefined,
    };

    return (
      <div className={cx('jarl-input-container', className)} {...containerFocusableProps}>
        <input
          aria-invalid={invalid || undefined}
          autoComplete={autoComplete}
          className="jarl-input"
          disabled={disabled}
          ref={ref}
          type={type}
          {...props}
        />
      </div>
    );
  },
);
