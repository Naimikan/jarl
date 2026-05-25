import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { extractElementFromRef } from './extractElementFromRef';

describe('extractElementFromRef', () => {
  describe('when value is nullable', () => {
    it('returns null when null is passed', () => {
      expect(extractElementFromRef(null)).toBeNull();
    });

    it('returns undefined when undefined is passed', () => {
      expect(extractElementFromRef(undefined)).toBeUndefined();
    });
  });

  describe('when value is a RefObject', () => {
    it('returns the element stored in ref.current', () => {
      const element = document.createElement('div');
      const ref = createRef<HTMLElement>();
      Object.defineProperty(ref, 'current', { value: element });

      expect(extractElementFromRef(ref)).toBe(element);
    });

    it('returns null when ref.current is null', () => {
      const ref = createRef<HTMLElement>();

      expect(extractElementFromRef(ref)).toBeNull();
    });
  });

  describe('when value is an HTMLElement', () => {
    it('returns the element directly', () => {
      const element = document.createElement('div');

      expect(extractElementFromRef(element)).toBe(element);
    });
  });
});
