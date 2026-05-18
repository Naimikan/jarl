import { describe, expect, it } from 'vitest';

import { isNull } from './isNull';

describe('isNull', () => {
  describe('returns true', () => {
    it('when the value is null', () => {
      expect(isNull(null)).toBe(true);
    });
  });

  describe('returns false', () => {
    it('when the value is undefined', () => {
      expect(isNull(undefined)).toBe(false);
    });

    it('when called with no arguments', () => {
      expect(isNull()).toBe(false);
    });

    it('when the value is 0', () => {
      expect(isNull(0)).toBe(false);
    });

    it('when the value is false', () => {
      expect(isNull(false)).toBe(false);
    });

    it('when the value is an empty string', () => {
      expect(isNull('')).toBe(false);
    });

    it('when the value is NaN', () => {
      expect(isNull(NaN)).toBe(false);
    });

    it('when the value is a number', () => {
      expect(isNull(42)).toBe(false);
    });

    it('when the value is a string', () => {
      expect(isNull('hello')).toBe(false);
    });

    it('when the value is true', () => {
      expect(isNull(true)).toBe(false);
    });

    it('when the value is an empty object', () => {
      expect(isNull({})).toBe(false);
    });

    it('when the value is an empty array', () => {
      expect(isNull([])).toBe(false);
    });

    it('when the value is a function', () => {
      expect(isNull(() => {})).toBe(false);
    });

    it('when the value is a Symbol', () => {
      expect(isNull(Symbol('sym'))).toBe(false);
    });

    it('when the value is a BigInt', () => {
      expect(isNull(BigInt(9007199254740991))).toBe(false);
    });

    it('when the value is the string "null"', () => {
      expect(isNull('null')).toBe(false);
    });
  });

  describe('real-world use cases', () => {
    it('filters out null values from an array', () => {
      const values = [1, null, 2, null, 3];
      const result = values.filter((v) => !isNull(v));
      expect(result).toEqual([1, 2, 3]);
    });

    it('distinguishes between null and undefined in an object', () => {
      const obj: Record<string, unknown> = { a: null, b: undefined, c: 0 };
      expect(isNull(obj.a)).toBe(true);
      expect(isNull(obj.b)).toBe(false);
      expect(isNull(obj.c)).toBe(false);
    });

    it('returns true for an object property explicitly set to null', () => {
      const obj = { key: null };
      expect(isNull(obj.key)).toBe(true);
    });

    it('returns false for a missing object property', () => {
      const obj: Record<string, unknown> = {};
      expect(isNull(obj['missing'])).toBe(false);
    });
  });
});
