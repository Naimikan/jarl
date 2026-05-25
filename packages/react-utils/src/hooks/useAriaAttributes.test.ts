import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAriaAttributes } from './useAriaAttributes';

describe('useAriaAttributes', () => {
  describe('when there are no aria props', () => {
    it('returns an empty object when no props are passed', () => {
      const { result } = renderHook(() => useAriaAttributes({}));
      expect(result.current).toEqual({});
    });

    it('returns an empty object when no prop starts with aria-', () => {
      const { result } = renderHook(() =>
        useAriaAttributes({ id: 'foo', className: 'bar', disabled: true }),
      );
      expect(result.current).toEqual({});
    });
  });

  describe('when there are aria props', () => {
    it('returns only props starting with aria-', () => {
      const { result } = renderHook(() =>
        useAriaAttributes({
          id: 'foo',
          'aria-label': 'close',
          'aria-hidden': true,
        }),
      );
      expect(result.current).toEqual({
        'aria-label': 'close',
        'aria-hidden': true,
      });
    });

    it('returns all aria props when there are no non-aria props', () => {
      const { result } = renderHook(() =>
        useAriaAttributes({
          'aria-label': 'submit',
          'aria-disabled': false,
          'aria-expanded': true,
        }),
      );
      expect(result.current).toEqual({
        'aria-label': 'submit',
        'aria-disabled': false,
        'aria-expanded': true,
      });
    });
  });

  describe('case-insensitive matching', () => {
    it('normalizes uppercase ARIA- key to lowercase', () => {
      const { result } = renderHook(() => useAriaAttributes({ 'ARIA-label': 'test' }));
      expect(result.current).toEqual({ 'aria-label': 'test' });
    });

    it('normalizes mixed case Aria- key to lowercase', () => {
      const { result } = renderHook(() => useAriaAttributes({ 'Aria-label': 'test' }));
      expect(result.current).toEqual({ 'aria-label': 'test' });
    });
  });

  describe('value types', () => {
    it('preserves string values', () => {
      const { result } = renderHook(() => useAriaAttributes({ 'aria-label': 'close dialog' }));
      expect(result.current).toEqual({ 'aria-label': 'close dialog' });
    });

    it('preserves boolean values', () => {
      const { result } = renderHook(() => useAriaAttributes({ 'aria-hidden': true }));
      expect(result.current).toEqual({ 'aria-hidden': true });
    });

    it('preserves number values', () => {
      const { result } = renderHook(() => useAriaAttributes({ 'aria-valuenow': 42 }));
      expect(result.current).toEqual({ 'aria-valuenow': 42 });
    });

    it('preserves undefined values', () => {
      const { result } = renderHook(() => useAriaAttributes({ 'aria-label': undefined }));
      expect(result.current).toEqual({ 'aria-label': undefined });
    });
  });

  describe('excludedAttributes', () => {
    it('excludes the specified aria attributes', () => {
      const { result } = renderHook(() =>
        useAriaAttributes({ 'aria-label': 'close', 'aria-hidden': true, 'aria-expanded': false }, [
          'aria-label',
          'aria-hidden',
        ]),
      );
      expect(result.current).toEqual({ 'aria-expanded': false });
    });

    it('returns all aria props when excludedAttributes is an empty array', () => {
      const { result } = renderHook(() =>
        useAriaAttributes({ 'aria-label': 'close', 'aria-hidden': true }, []),
      );
      expect(result.current).toEqual({ 'aria-label': 'close', 'aria-hidden': true });
    });

    it('returns all aria props when excludedAttributes is undefined', () => {
      const { result } = renderHook(() =>
        useAriaAttributes({ 'aria-label': 'close', 'aria-hidden': true }, undefined),
      );
      expect(result.current).toEqual({ 'aria-label': 'close', 'aria-hidden': true });
    });

    it('does not exclude non-matching attributes', () => {
      const { result } = renderHook(() =>
        useAriaAttributes({ 'aria-label': 'close', 'aria-hidden': true }, ['aria-expanded']),
      );
      expect(result.current).toEqual({ 'aria-label': 'close', 'aria-hidden': true });
    });

    it('returns empty object when all aria props are excluded', () => {
      const { result } = renderHook(() =>
        useAriaAttributes({ 'aria-label': 'close', 'aria-hidden': true }, [
          'aria-label',
          'aria-hidden',
        ]),
      );
      expect(result.current).toEqual({});
    });
  });
});
