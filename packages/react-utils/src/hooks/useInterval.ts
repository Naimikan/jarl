import { useCallback, useEffect, useRef, useState } from 'react';

import { useLatest } from './useLatest';

export type UseIntervalCallbackProp = () => void;
export type UseIntervalDurationProp = number;
export type UseIntervalImmediate = boolean;

export const useInterval = (
  callback: UseIntervalCallbackProp,
  duration?: UseIntervalDurationProp,
  immediate?: UseIntervalImmediate,
) => {
  const [isRunning, setIsRunning] = useState<boolean>(!!immediate);

  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callbackRef = useLatest(callback);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalIdRef.current = setInterval(() => callbackRef.current(), duration ?? 100);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [duration, isRunning]);

  return { start, stop, isRunning };
};
