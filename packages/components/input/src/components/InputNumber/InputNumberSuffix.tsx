import { type MouseEvent, type TouchEvent, useCallback, useEffect, useRef } from 'react';

import { useInterval } from '@jarl/react-utils';
import { isDefined } from '@jarl/utils';

import { isLeftMouseClickEvent } from '../../helpers/isLeftMouseClickEvent';

import './InputNumberSuffix.styles.css';

const CHANGE_INTERVAL = 20;
const TIMEOUT_TO_START_CHANGE = 300;

interface InputNumberSuffixProps {
  currentValue?: number;
  decrease: () => void;
  increase: () => void;
  inputId: string;
  max: number;
  min: number;
}

export const InputNumberSuffix = ({
  inputId,
  currentValue,
  min,
  max,
  increase,
  decrease,
}: InputNumberSuffixProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionRef = useRef<'increase' | 'decrease' | null>(null);

  const removeTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const { start: startInterval, stop: stopInterval } = useInterval(() => {
    if (actionRef.current === 'increase') {
      increase();
    }

    if (actionRef.current === 'decrease') {
      decrease();
    }
  }, CHANGE_INTERVAL);

  const handleIncrease = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isLeftMouseClickEvent(event)) {
        return;
      }

      increase();

      timeoutRef.current = setTimeout(() => {
        actionRef.current = 'increase';
        startInterval();
      }, TIMEOUT_TO_START_CHANGE);
    },
    [increase, startInterval],
  );

  const handleDecrease = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isLeftMouseClickEvent(event)) {
        return;
      }

      decrease();

      timeoutRef.current = setTimeout(() => {
        actionRef.current = 'decrease';
        startInterval();
      }, TIMEOUT_TO_START_CHANGE);
    },
    [decrease, startInterval],
  );

  const handleStop = useCallback(() => {
    actionRef.current = null;
    stopInterval();
    removeTimeout();
  }, [stopInterval, removeTimeout]);

  const handleClickIncrease = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (event.detail === 0) {
        increase();
      }
    },
    [increase],
  );

  const handleClickDecrease = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (event.detail === 0) {
        decrease();
      }
    },
    [decrease],
  );

  useEffect(() => () => removeTimeout(), [removeTimeout]);

  return (
    <div className="jarl-input-number__stepper">
      <button
        aria-controls={inputId}
        aria-label="Increase"
        className="jarl-input-number__stepper-button"
        disabled={isDefined(currentValue) ? currentValue >= max : false}
        onClick={handleClickIncrease}
        onMouseDown={handleIncrease}
        onMouseLeave={handleStop}
        onMouseUp={handleStop}
        onTouchEnd={handleStop}
        onTouchStart={handleIncrease}
        tabIndex={-1}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="chevron-up"
          fill="none"
          height="12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="12"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
      <button
        aria-controls={inputId}
        aria-label="Decrease"
        className="jarl-input-number__stepper-button"
        disabled={isDefined(currentValue) ? currentValue <= min : false}
        onClick={handleClickDecrease}
        onMouseDown={handleDecrease}
        onMouseLeave={handleStop}
        onMouseUp={handleStop}
        onTouchEnd={handleStop}
        onTouchStart={handleDecrease}
        tabIndex={-1}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="chevron-down"
          fill="none"
          height="12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="12"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
};
