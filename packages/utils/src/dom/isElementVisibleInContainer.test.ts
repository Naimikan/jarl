// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { isElementVisibleInContainer } from './isElementVisibleInContainer';

describe('isElementVisibleInContainer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should return false if the element has an area of 0 (width or height is 0)', () => {
    const container = document.createElement('div');
    const element = document.createElement('div');
    container.appendChild(element);
    document.body.appendChild(container);

    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
    } as DOMRect);

    // Element has zero height, making its area 0
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 10,
      bottom: 10,
      left: 10,
      right: 20,
      width: 10,
      height: 0,
    } as DOMRect);

    expect(isElementVisibleInContainer({ container, element })).toBe(false);
  });

  it('should return true when the element is fully inside the container', () => {
    const container = document.createElement('div');
    const element = document.createElement('div');
    container.appendChild(element);
    document.body.appendChild(container);

    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 500,
      left: 100,
      right: 500,
    } as DOMRect);

    // Element is perfectly centered inside the container boundaries
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 200,
      bottom: 300,
      left: 200,
      right: 300,
      width: 100,
      height: 100,
    } as DOMRect);

    expect(isElementVisibleInContainer({ container, element })).toBe(true);
  });

  it('should return true when the element is only partially visible (intersecting a boundary)', () => {
    const container = document.createElement('div');
    const element = document.createElement('div');
    container.appendChild(element);
    document.body.appendChild(container);

    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
    } as DOMRect);

    // Element is halfway poking out of the right side of the container
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 10,
      bottom: 50,
      left: 80,
      right: 120, // container ends at 100, element ends at 120
      width: 40,
      height: 40,
    } as DOMRect);

    expect(isElementVisibleInContainer({ container, element })).toBe(true);
  });

  it('should return false when the element is completely outside the container boundaries', () => {
    const container = document.createElement('div');
    const element = document.createElement('div');
    container.appendChild(element);
    document.body.appendChild(container);

    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
    } as DOMRect);

    // Element is positioned below the container with no intersection
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 150,
      bottom: 200,
      left: 10,
      right: 60,
      width: 50,
      height: 50,
    } as DOMRect);

    expect(isElementVisibleInContainer({ container, element })).toBe(false);
  });

  it('should return false when the element touches the container edge exactly but has 0 visible intersection area', () => {
    const container = document.createElement('div');
    const element = document.createElement('div');
    container.appendChild(element);
    document.body.appendChild(container);

    vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
    } as DOMRect);

    // Element top matches container bottom exactly (touching edges)
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 150,
      left: 10,
      right: 60,
      width: 50,
      height: 50,
    } as DOMRect);

    // Vertical intersection will evaluate to Math.max(0, 100 - 100) = 0
    expect(isElementVisibleInContainer({ container, element })).toBe(false);
  });
});
