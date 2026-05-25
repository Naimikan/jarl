import { describe, expect, it } from 'vitest';

import { useFocusable } from './useFocusable';

describe('useFocusable', () => {
  describe('non-native, non-supports-disabled elements (div, span, a)', () => {
    it('returns tabIndex 0 and no disabled or aria-disabled by default', () => {
      expect(useFocusable('div')).toEqual({
        tabIndex: 0,
        disabled: undefined,
        'aria-disabled': undefined,
      });
    });

    it('returns tabIndex undefined and aria-disabled true when disabled', () => {
      expect(useFocusable('div', { disabled: true })).toEqual({
        tabIndex: undefined,
        disabled: undefined,
        'aria-disabled': true,
      });
    });

    it('returns tabIndex 0 and aria-disabled true when disabled and focusable', () => {
      expect(useFocusable('div', { disabled: true, focusable: true })).toEqual({
        tabIndex: 0,
        disabled: undefined,
        'aria-disabled': true,
      });
    });

    it('returns tabIndex -1 and no aria-disabled when focusable is false', () => {
      expect(useFocusable('div', { focusable: false })).toEqual({
        tabIndex: -1,
        disabled: undefined,
        'aria-disabled': undefined,
      });
    });

    it('returns tabIndex 0 when focusable is true', () => {
      expect(useFocusable('div', { focusable: true })).toEqual({
        tabIndex: 0,
        disabled: undefined,
        'aria-disabled': undefined,
      });
    });
  });

  describe('native tabbable + supports disabled elements (button, input, select, textarea)', () => {
    it('returns tabIndex undefined and disabled false by default', () => {
      expect(useFocusable('button')).toEqual({
        tabIndex: undefined,
        disabled: false,
        'aria-disabled': undefined,
      });
    });

    it('returns disabled true and no aria-disabled when disabled', () => {
      expect(useFocusable('button', { disabled: true })).toEqual({
        tabIndex: undefined,
        disabled: true,
        'aria-disabled': undefined,
      });
    });

    it('returns disabled false and aria-disabled true when disabled and focusable', () => {
      expect(useFocusable('button', { disabled: true, focusable: true })).toEqual({
        tabIndex: undefined,
        disabled: false,
        'aria-disabled': true,
      });
    });

    it('returns tabIndex -1 when focusable is false', () => {
      expect(useFocusable('button', { focusable: false })).toEqual({
        tabIndex: -1,
        disabled: false,
        'aria-disabled': undefined,
      });
    });

    it('returns tabIndex undefined when focusable is true', () => {
      expect(useFocusable('button', { focusable: true })).toEqual({
        tabIndex: undefined,
        disabled: false,
        'aria-disabled': undefined,
      });
    });

    it('behaves the same for input', () => {
      expect(useFocusable('input', { disabled: true })).toEqual({
        tabIndex: undefined,
        disabled: true,
        'aria-disabled': undefined,
      });
    });
  });

  describe('supports disabled but not native tabbable elements (fieldset, optgroup, option)', () => {
    it('returns tabIndex 0 and disabled false by default', () => {
      expect(useFocusable('fieldset')).toEqual({
        tabIndex: 0,
        disabled: false,
        'aria-disabled': undefined,
      });
    });

    it('returns tabIndex undefined and disabled true when disabled', () => {
      expect(useFocusable('fieldset', { disabled: true })).toEqual({
        tabIndex: undefined,
        disabled: true,
        'aria-disabled': undefined,
      });
    });

    it('returns tabIndex 0 and aria-disabled true when disabled and focusable', () => {
      expect(useFocusable('fieldset', { disabled: true, focusable: true })).toEqual({
        tabIndex: 0,
        disabled: false,
        'aria-disabled': true,
      });
    });

    it('returns tabIndex -1 when focusable is false', () => {
      expect(useFocusable('fieldset', { focusable: false })).toEqual({
        tabIndex: -1,
        disabled: false,
        'aria-disabled': undefined,
      });
    });
  });
});
