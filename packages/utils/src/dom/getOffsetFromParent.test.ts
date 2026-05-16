import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getOffsetFromParent } from './getOffsetFromParent';

describe('getOffsetFromParent', () => {
  beforeEach(() => {
    // Reset all global mocks before each test
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should calculate accurate offsets when parent has no borders', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);

    // Mock parent dimensions and viewport positions
    vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 150,
      bottom: 400,
      right: 550,
      width: 400,
      height: 300,
    } as DOMRect);

    // Mock child dimensions and viewport positions
    vi.spyOn(child, 'getBoundingClientRect').mockReturnValue({
      top: 150,
      left: 200,
      bottom: 250,
      right: 300,
      width: 100,
      height: 100,
    } as DOMRect);

    // Mock window.getComputedStyle to return 0px borders
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      borderTopWidth: '0px',
      borderLeftWidth: '0px',
    } as CSSStyleDeclaration);

    const result = getOffsetFromParent({ parentElement: parent, element: child });

    // top = 150 - 100 - 0 = 50
    // left = 200 - 150 - 0 = 50
    expect(result).toEqual({
      top: 50,
      left: 50,
      bottom: 150, // 50 (top) + 100 (height)
      right: 150, // 50 (left) + 100 (width)
      width: 100,
      height: 100,
    });
  });

  it('should adjust offsets correctly by subtracting the parent borders', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);

    vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 100,
      width: 500,
      height: 500,
    } as DOMRect);

    vi.spyOn(child, 'getBoundingClientRect').mockReturnValue({
      top: 200,
      left: 200,
      width: 50,
      height: 50,
    } as DOMRect);

    // Mock parent with explicit 15px borders
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      borderTopWidth: '15px',
      borderLeftWidth: '15px',
    } as CSSStyleDeclaration);

    const result = getOffsetFromParent({ parentElement: parent, element: child });

    // top = 200 - 100 - 15 = 85
    // left = 200 - 100 - 15 = 85
    expect(result).toEqual({
      top: 85,
      left: 85,
      bottom: 135, // 85 + 50
      right: 135, // 85 + 50
      width: 50,
      height: 50,
    });
  });

  it('should handle complex string units or fallback safely if border values are missing/malformed', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);

    vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
      top: 50,
      left: 50,
      width: 200,
      height: 200,
    } as DOMRect);

    vi.spyOn(child, 'getBoundingClientRect').mockReturnValue({
      top: 120,
      left: 120,
      width: 30,
      height: 30,
    } as DOMRect);

    // Testing fallback behavior if getComputedStyle returns undefined or unparseable units
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      borderTopWidth: '', // malformed/empty
      borderLeftWidth: '0px',
    } as CSSStyleDeclaration);

    const result = getOffsetFromParent({ parentElement: parent, element: child });

    // top = 120 - 50 - 0 (fallback) = 70
    // left = 120 - 50 - 0 = 70
    expect(result.top).toBe(70);
    expect(result.left).toBe(70);
  });

  it('should return zero or negative offsets if the child is positioned outside or exactly at the parent edge', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);
    document.body.appendChild(parent);

    vi.spyOn(parent, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 100,
      width: 300,
      height: 300,
    } as DOMRect);

    // Child is positioned completely outside, above and to the left of the parent
    vi.spyOn(child, 'getBoundingClientRect').mockReturnValue({
      top: 50,
      left: 50,
      width: 40,
      height: 40,
    } as DOMRect);

    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      borderTopWidth: '10px',
      borderLeftWidth: '10px',
    } as CSSStyleDeclaration);

    const result = getOffsetFromParent({ parentElement: parent, element: child });

    // top = 50 - 100 - 10 = -60
    // left = 50 - 100 - 10 = -60
    expect(result.top).toBe(-60);
    expect(result.left).toBe(-60);
    expect(result.bottom).toBe(-20); // -60 + 40
    expect(result.right).toBe(-20); // -60 + 40
  });
});
