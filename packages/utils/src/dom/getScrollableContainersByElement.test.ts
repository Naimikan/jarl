// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as scrollUtils from './getClosestScrollableElement';
import { getScrollableContainersByElement } from './getScrollableContainersByElement';

describe('getScrollableContainersByElement', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should return an empty array if the element is null', () => {
    // Force the underlying utility to return null
    vi.spyOn(scrollUtils, 'getClosestScrollableElement').mockReturnValue(null);

    const result = getScrollableContainersByElement(null);
    expect(result).toEqual([]);
  });

  it('should return a single container when only one scrollable ancestor exists', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');

    vi.spyOn(scrollUtils, 'getClosestScrollableElement').mockImplementation((el) => {
      if (el === child) {
        return parent;
      }
      return null; // When called on the parent, no more scrollable parents are found
    });

    const result = getScrollableContainersByElement(child);
    expect(result).toEqual([parent]);
    expect(result.length).toBe(1);
  });

  it('should recursively collect all scrollable containers up the DOM tree', () => {
    const greatGrandParent = document.createElement('div');
    const grandParent = document.createElement('div');
    const parent = document.createElement('div');
    const child = document.createElement('span');

    // Simulate a deep tree where multiple elements are scrollable
    vi.spyOn(scrollUtils, 'getClosestScrollableElement').mockImplementation((el) => {
      if (el === child) {
        return parent;
      }
      if (el === parent) {
        return grandParent;
      }
      if (el === grandParent) {
        return greatGrandParent;
      }
      return null; // Stops at the top
    });

    const result = getScrollableContainersByElement(child);

    // Should preserve the order from closest to furthest ancestor
    expect(result).toEqual([parent, grandParent, greatGrandParent]);
    expect(result.length).toBe(3);
  });

  it('should filter out any unexpected falsy values and handle early terminations gracefully', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');

    vi.spyOn(scrollUtils, 'getClosestScrollableElement').mockImplementation((el) => {
      if (el === child) {
        return parent;
      }

      return null;
    });

    const result = getScrollableContainersByElement(child);
    expect(result).toEqual([parent]);
  });
});
