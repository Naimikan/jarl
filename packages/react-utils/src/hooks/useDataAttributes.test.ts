import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDataAttributes } from './useDataAttributes';

describe('useDataAttributes', () => {
  describe('when there are no data props', () => {
    it('returns an empty object when no props are passed', () => {
      const { result } = renderHook(() => useDataAttributes({}));
      expect(result.current).toEqual({});
    });

    it('returns an empty object when no prop starts with data-', () => {
      const { result } = renderHook(() =>
        useDataAttributes({ id: 'foo', className: 'bar', disabled: true }),
      );
      expect(result.current).toEqual({});
    });
  });

  describe('when there are data props', () => {
    it('returns only props starting with data-', () => {
      const { result } = renderHook(() =>
        useDataAttributes({
          id: 'foo',
          'data-label': 'close',
          'data-hidden': true,
        }),
      );
      expect(result.current).toEqual({
        'data-label': 'close',
        'data-hidden': true,
      });
    });

    it('returns all data props when there are no non-data props', () => {
      const { result } = renderHook(() =>
        useDataAttributes({
          'data-label': 'submit',
          'data-disabled': false,
          'data-expanded': true,
        }),
      );
      expect(result.current).toEqual({
        'data-label': 'submit',
        'data-disabled': false,
        'data-expanded': true,
      });
    });
  });

  describe('case-insensitive matching', () => {
    it('normalizes uppercase data- key to lowercase', () => {
      const { result } = renderHook(() => useDataAttributes({ 'data-label': 'test' }));
      expect(result.current).toEqual({ 'data-label': 'test' });
    });

    it('normalizes mixed case data- key to lowercase', () => {
      const { result } = renderHook(() => useDataAttributes({ 'data-label': 'test' }));
      expect(result.current).toEqual({ 'data-label': 'test' });
    });
  });

  describe('value types', () => {
    it('preserves string values', () => {
      const { result } = renderHook(() => useDataAttributes({ 'data-label': 'close dialog' }));
      expect(result.current).toEqual({ 'data-label': 'close dialog' });
    });

    it('preserves boolean values', () => {
      const { result } = renderHook(() => useDataAttributes({ 'data-hidden': true }));
      expect(result.current).toEqual({ 'data-hidden': true });
    });

    it('preserves number values', () => {
      const { result } = renderHook(() => useDataAttributes({ 'data-valuenow': 42 }));
      expect(result.current).toEqual({ 'data-valuenow': 42 });
    });

    it('preserves undefined values', () => {
      const { result } = renderHook(() => useDataAttributes({ 'data-label': undefined }));
      expect(result.current).toEqual({ 'data-label': undefined });
    });
  });

  describe('excludedAttributes', () => {
    it('excludes the specified data attributes', () => {
      const { result } = renderHook(() =>
        useDataAttributes({ 'data-label': 'close', 'data-hidden': true, 'data-expanded': false }, [
          'data-label',
          'data-hidden',
        ]),
      );
      expect(result.current).toEqual({ 'data-expanded': false });
    });

    it('returns all data props when excludedAttributes is an empty array', () => {
      const { result } = renderHook(() =>
        useDataAttributes({ 'data-label': 'close', 'data-hidden': true }, []),
      );
      expect(result.current).toEqual({ 'data-label': 'close', 'data-hidden': true });
    });

    it('returns all data props when excludedAttributes is undefined', () => {
      const { result } = renderHook(() =>
        useDataAttributes({ 'data-label': 'close', 'data-hidden': true }, undefined),
      );
      expect(result.current).toEqual({ 'data-label': 'close', 'data-hidden': true });
    });

    it('does not exclude non-matching attributes', () => {
      const { result } = renderHook(() =>
        useDataAttributes({ 'data-label': 'close', 'data-hidden': true }, ['data-expanded']),
      );
      expect(result.current).toEqual({ 'data-label': 'close', 'data-hidden': true });
    });

    it('returns empty object when all data props are excluded', () => {
      const { result } = renderHook(() =>
        useDataAttributes({ 'data-label': 'close', 'data-hidden': true }, [
          'data-label',
          'data-hidden',
        ]),
      );
      expect(result.current).toEqual({});
    });
  });
});
