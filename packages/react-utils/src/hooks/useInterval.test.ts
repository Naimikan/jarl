import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useInterval } from './useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('is not running by default', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback));

      expect(result.current.isRunning).toBe(false);
    });

    it('is running if immediate is true', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100, true));

      expect(result.current.isRunning).toBe(true);
    });

    it('is not running if immediate is false', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100, false));

      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('start', () => {
    it('starts the interval', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100));

      act(() => {
        result.current.start();
      });

      expect(result.current.isRunning).toBe(true);
    });

    it('calls the callback after each interval', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('calling start when already running does not cause additional effects', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100));

      act(() => {
        result.current.start();
      });

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('stop', () => {
    it('stops the interval', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100));

      act(() => {
        result.current.start();
      });

      act(() => {
        result.current.stop();
      });

      expect(result.current.isRunning).toBe(false);
    });

    it('does not call the callback after stopping', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(150);
      });

      act(() => {
        result.current.stop();
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('calling stop when not running does not throw', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100));

      expect(() => {
        act(() => {
          result.current.stop();
        });
      }).not.toThrow();

      expect(result.current.isRunning).toBe(false);
    });
  });

  describe('start and stop combined', () => {
    it('can be stopped and started multiple times', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 100));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      act(() => {
        result.current.stop();
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(callback).toHaveBeenCalledTimes(4);
    });
  });

  describe('duration', () => {
    it('defaults to 100ms if no duration is provided', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(250);
      });

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('respects a custom duration', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useInterval(callback, 500));

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('restarts the interval when duration changes', () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(({ duration }) => useInterval(callback, duration), {
        initialProps: { duration: 100 },
      });

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      rerender({ duration: 500 });

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('callback', () => {
    it('always uses the latest version of the callback', () => {
      const results: string[] = [];
      const { result, rerender } = renderHook(({ cb }) => useInterval(cb, 100), {
        initialProps: { cb: () => results.push('v1') },
      });

      act(() => {
        result.current.start();
      });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      rerender({ cb: () => results.push('v2') });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(results).toEqual(['v1', 'v2']);
    });
  });

  describe('immediate', () => {
    it('starts the interval immediately on mount if immediate is true', () => {
      const callback = vi.fn();
      renderHook(() => useInterval(callback, 100, true));

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  describe('cleanup', () => {
    it('clears the interval when the component unmounts', () => {
      const callback = vi.fn();
      const { result, unmount } = renderHook(() => useInterval(callback, 100));

      act(() => {
        result.current.start();
      });

      unmount();

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(callback).toHaveBeenCalledTimes(0);
    });
  });
});
