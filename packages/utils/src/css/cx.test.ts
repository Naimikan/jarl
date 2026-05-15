import { describe, expect, it } from 'vitest';

import { cx } from './cx';

describe('cx utility', () => {
  it('should join simple class strings', () => {
    expect(cx('foo', 'bar')).toBe('foo bar');
    expect(cx('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('should ignore falsy values (booleans, null, undefined, empty strings)', () => {
    expect(cx('foo', false, 'bar', null, undefined, '')).toBe('foo bar');
  });

  it('should support and transform valid numbers to strings', () => {
    expect(cx('item', 5, 120)).toBe('item 5 120');
  });

  it('should ignore the number 0 as it is falsy (short-circuit behavior)', () => {
    expect(cx('items-count', 0 && 'has-items')).toBe('items-count');
  });

  it('should recursively flatten arrays', () => {
    expect(cx(['foo', 'bar'], ['baz', ['nested', 'deep']])).toBe('foo bar baz nested deep');
  });

  it('should handle mixed arrays with falsy values', () => {
    expect(cx(['foo', false, 'bar'], [null, 'baz', undefined])).toBe('foo bar baz');
  });

  it('should process objects applying keys whose conditions are truthy', () => {
    const objectClasses = {
      'bg-red-500': true,
      'text-white': 1,
      'opacity-0': false,
      hidden: null,
      border: undefined,
    };

    expect(cx(objectClasses)).toBe('bg-red-500 text-white');
  });

  it('should support complex and hybrid structures (mixed arrays, objects, and strings)', () => {
    expect(
      cx('base-class', ['array-1', 'array-2'], { 'conditional-1': true, 'conditional-2': false }, [
        'nested-array',
        { 'nested-conditional': true },
      ]),
    ).toBe('base-class array-1 array-2 conditional-1 nested-array nested-conditional');
  });

  it('should return an empty string if no arguments are passed or all are falsy', () => {
    expect(cx()).toBe('');
    expect(cx(false, null, undefined)).toBe('');
  });
});
