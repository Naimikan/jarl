import { describe, expect, it } from 'vitest';

import { isDefinedAndNotNull } from './isDefinedAndNotNull';

describe('isDefinedAndNotNull', () => {
  describe('returns false', () => {
    it('when the value is null', () => {
      expect(isDefinedAndNotNull(null)).toBe(false);
    });

    it('when the value is undefined', () => {
      expect(isDefinedAndNotNull(undefined)).toBe(false);
    });

    it('when called with no arguments', () => {
      expect(isDefinedAndNotNull()).toBe(false);
    });

    it('when the variable is declared without a value', () => {
      let x: unknown;
      expect(isDefinedAndNotNull(x)).toBe(false);
    });
  });

  describe('returns true', () => {
    it('when the value is 0', () => {
      expect(isDefinedAndNotNull(0)).toBe(true);
    });

    it('when the value is false', () => {
      expect(isDefinedAndNotNull(false)).toBe(true);
    });

    it('when the value is an empty string', () => {
      expect(isDefinedAndNotNull('')).toBe(true);
    });

    it('when the value is NaN', () => {
      expect(isDefinedAndNotNull(NaN)).toBe(true);
    });

    it('when the value is a number', () => {
      expect(isDefinedAndNotNull(42)).toBe(true);
    });

    it('when the value is a string', () => {
      expect(isDefinedAndNotNull('hello')).toBe(true);
    });

    it('when the value is true', () => {
      expect(isDefinedAndNotNull(true)).toBe(true);
    });

    it('when the value is an empty object', () => {
      expect(isDefinedAndNotNull({})).toBe(true);
    });

    it('when the value is an empty array', () => {
      expect(isDefinedAndNotNull([])).toBe(true);
    });

    it('when the value is a function', () => {
      expect(isDefinedAndNotNull(() => {})).toBe(true);
    });

    it('when the value is a Symbol', () => {
      expect(isDefinedAndNotNull(Symbol('sym'))).toBe(true);
    });

    it('when the value is a BigInt', () => {
      expect(isDefinedAndNotNull(BigInt(9007199254740991))).toBe(true);
    });
  });

  describe('real-world use cases', () => {
    it('filters out both null and undefined values from an array', () => {
      const values = [1, null, 2, undefined, 3, null, undefined];
      const result = values.filter(isDefinedAndNotNull);
      expect(result).toEqual([1, 2, 3]);
    });

    it('distinguishes defined non-null values from null and undefined in an object', () => {
      const obj: Record<string, unknown> = { a: null, b: undefined, c: 0, d: '' };
      expect(isDefinedAndNotNull(obj.a)).toBe(false);
      expect(isDefinedAndNotNull(obj.b)).toBe(false);
      expect(isDefinedAndNotNull(obj.c)).toBe(true);
      expect(isDefinedAndNotNull(obj.d)).toBe(true);
    });

    it('returns false for a missing object property', () => {
      const obj: Record<string, unknown> = {};
      expect(isDefinedAndNotNull(obj['missing'])).toBe(false);
    });

    it('returns true for an object property set to an explicit value', () => {
      const obj = { key: 'value' };
      expect(isDefinedAndNotNull(obj.key)).toBe(true);
    });

    it('returns false for an object property explicitly set to null', () => {
      const obj = { key: null };
      expect(isDefinedAndNotNull(obj.key)).toBe(false);
    });
  });
});
