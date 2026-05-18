import { describe, expect, it } from 'vitest';

import { isDefined } from './isDefined';

describe('isDefined', () => {
  describe('returns false', () => {
    it('when the value is undefined', () => {
      expect(isDefined(undefined)).toBe(false);
    });

    it('when called with no arguments', () => {
      expect(isDefined()).toBe(false);
    });

    it('when the variable is declared without a value', () => {
      let x: unknown;
      expect(isDefined(x)).toBe(false);
    });
  });

  describe('returns true', () => {
    it('when the value is null', () => {
      expect(isDefined(null)).toBe(true);
    });

    it('when the value is 0', () => {
      expect(isDefined(0)).toBe(true);
    });

    it('when the value is false', () => {
      expect(isDefined(false)).toBe(true);
    });

    it('when the value is an empty string', () => {
      expect(isDefined('')).toBe(true);
    });

    it('when the value is NaN', () => {
      expect(isDefined(NaN)).toBe(true);
    });

    it('when the value is a number', () => {
      expect(isDefined(42)).toBe(true);
    });

    it('when the value is a string', () => {
      expect(isDefined('hello')).toBe(true);
    });

    it('when the value is true', () => {
      expect(isDefined(true)).toBe(true);
    });

    it('when the value is an empty object', () => {
      expect(isDefined({})).toBe(true);
    });

    it('when the value is an empty array', () => {
      expect(isDefined([])).toBe(true);
    });

    it('when the value is a function', () => {
      expect(isDefined(() => {})).toBe(true);
    });

    it('when the value is a Symbol', () => {
      expect(isDefined(Symbol('sym'))).toBe(true);
    });

    it('when the value is a BigInt', () => {
      expect(isDefined(BigInt(9007199254740991))).toBe(true);
    });
  });

  describe('real-world use cases', () => {
    it('filters out undefined values from an array', () => {
      const values = [1, undefined, 2, undefined, 3];
      const result = values.filter(isDefined);
      expect(result).toEqual([1, 2, 3]);
    });

    it('distinguishes between undefined and null in an object', () => {
      const obj: Record<string, unknown> = { a: undefined, b: null, c: 0 };
      expect(isDefined(obj.a)).toBe(false);
      expect(isDefined(obj.b)).toBe(true);
      expect(isDefined(obj.c)).toBe(true);
    });

    it('returns true for an existing property with a value', () => {
      const obj = { key: 'value' };
      expect(isDefined(obj.key)).toBe(true);
    });

    it('returns false for a missing object property', () => {
      const obj: Record<string, unknown> = {};
      expect(isDefined(obj['missing'])).toBe(false);
    });
  });
});
