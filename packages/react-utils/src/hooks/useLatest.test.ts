import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useLatest } from './useLatest';

describe('useLatest', () => {
  describe('initial value', () => {
    it('returns a ref with the initial value', () => {
      const { result } = renderHook(() => useLatest('initial'));
      expect(result.current.current).toBe('initial');
    });

    it('works with different value types', () => {
      const object = { foo: 'bar' };
      const { result } = renderHook(() => useLatest(object));
      expect(result.current.current).toBe(object);
    });

    it('works with a function as value', () => {
      const fn = vi.fn();
      const { result } = renderHook(() => useLatest(fn));
      expect(result.current.current).toBe(fn);
    });
  });

  describe('when value changes', () => {
    it('updates ref.current with the latest value', () => {
      const { result, rerender } = renderHook(({ value }) => useLatest(value), {
        initialProps: { value: 'initial' },
      });

      rerender({ value: 'updated' });

      expect(result.current.current).toBe('updated');
    });

    it('returns the same ref object across re-renders', () => {
      const { result, rerender } = renderHook(({ value }) => useLatest(value), {
        initialProps: { value: 'initial' },
      });

      const refAfterFirstRender = result.current;
      rerender({ value: 'updated' });

      expect(result.current).toBe(refAfterFirstRender);
    });
  });
});
