import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { getScrollbarWidthByElement } from './getScrollbarWidthByElement';

describe('getScrollbarWidthByElement', () => {
  describe('edge cases', () => {
    it('returns 0 when rootElement is null', () => {
      expect(getScrollbarWidthByElement(null)).toBe(0);
    });

    it('returns 0 in SSR environment (window undefined)', () => {
      const originalWindow = globalThis.window;
      // @ts-expect-error simulating SSR
      delete globalThis.window;

      expect(getScrollbarWidthByElement(document.body)).toBe(0);

      globalThis.window = originalWindow;
    });
  });

  describe('body and html elements', () => {
    beforeEach(() => {
      vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
      vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1009);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('uses window.innerWidth - documentElement.clientWidth for document.body', () => {
      expect(getScrollbarWidthByElement(document.body)).toBe(15);
    });

    it('uses window.innerWidth - documentElement.clientWidth for document.documentElement', () => {
      expect(getScrollbarWidthByElement(document.documentElement)).toBe(15);
    });

    it('returns 0 when there is no scrollbar (overlay scrollbars)', () => {
      vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
      vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1024);

      expect(getScrollbarWidthByElement(document.body)).toBe(0);
    });
  });

  describe('generic elements', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      element.remove();
      vi.restoreAllMocks();
    });

    it('returns offsetWidth - clientWidth when element has a scrollbar', () => {
      vi.spyOn(element, 'offsetWidth', 'get').mockReturnValue(200);
      vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(185);

      expect(getScrollbarWidthByElement(element)).toBe(15);
    });

    it('returns 0 when element has no scrollbar', () => {
      vi.spyOn(element, 'offsetWidth', 'get').mockReturnValue(200);
      vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(200);

      expect(getScrollbarWidthByElement(element)).toBe(0);
    });

    it('does not use window.innerWidth for generic elements', () => {
      vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
      vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1009);
      vi.spyOn(element, 'offsetWidth', 'get').mockReturnValue(200);
      vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(185);

      expect(getScrollbarWidthByElement(element)).toBe(15);
    });
  });
});
