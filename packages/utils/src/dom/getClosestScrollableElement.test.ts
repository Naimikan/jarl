// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getClosestScrollableElement } from './getClosestScrollableElement';

describe('getClosestScrollableElement', () => {
  beforeEach(() => {
    // Clear the DOM before each test to prevent pollution
    document.body.innerHTML = '';
  });

  it('should return null if the element is null', () => {
    expect(getClosestScrollableElement(null)).toBeNull();
  });

  it('should return null if the element is document.documentElement', () => {
    expect(getClosestScrollableElement(document.documentElement)).toBeNull();
  });

  it('should return document.documentElement if no scrollable ancestor is found', () => {
    // Structure: body -> container -> target
    const container = document.createElement('div');
    const target = document.createElement('span');

    container.appendChild(target);
    document.body.appendChild(container);

    expect(getClosestScrollableElement(target)).toBe(document.documentElement);
  });

  it('should find the closest parent with overflow set to "auto" or "scroll"', () => {
    // Structure: body -> scrollable (overflow: scroll) -> container -> target
    const scrollable = document.createElement('div');
    scrollable.style.overflow = 'scroll';

    const container = document.createElement('div');
    const target = document.createElement('button');

    container.appendChild(target);
    scrollable.appendChild(container);
    document.body.appendChild(scrollable);

    expect(getClosestScrollableElement(target)).toBe(scrollable);
  });

  it('should support shorthand or combined overflow values (e.g., "hidden auto")', () => {
    // Structure: body -> scrollable (overflow: hidden auto) -> target
    const scrollable = document.createElement('div');
    scrollable.style.overflow = 'hidden auto';

    const target = document.createElement('div');
    scrollable.appendChild(target);
    document.body.appendChild(scrollable);

    expect(getClosestScrollableElement(target)).toBe(scrollable);
  });

  it('should skip ancestors with overflow "hidden" or "visible"', () => {
    // Structure: body -> scrollable (scroll) -> nonScrollable (hidden) -> target
    const scrollable = document.createElement('div');
    scrollable.style.overflow = 'scroll';

    const nonScrollable = document.createElement('div');
    nonScrollable.style.overflow = 'hidden';

    const target = document.createElement('div');

    nonScrollable.appendChild(target);
    scrollable.appendChild(nonScrollable);
    document.body.appendChild(scrollable);

    expect(getClosestScrollableElement(target)).toBe(scrollable);
  });

  it('should work correctly using window.getComputedStyle via mocking if environment styles are strict', () => {
    // Safety test in case the happy-dom engine handles calculated styles strictly.
    // We force the value that getComputedStyle will return using a spy.
    const scrollable = document.createElement('div');
    const target = document.createElement('div');
    scrollable.appendChild(target);
    document.body.appendChild(scrollable);

    vi.spyOn(window, 'getComputedStyle').mockImplementation((el) => {
      if (el === scrollable) {
        return { overflow: 'auto' } as CSSStyleDeclaration;
      }
      return {} as CSSStyleDeclaration;
    });

    expect(getClosestScrollableElement(target)).toBe(scrollable);

    // Restore original getComputedStyle behavior
    vi.restoreAllMocks();
  });
});
