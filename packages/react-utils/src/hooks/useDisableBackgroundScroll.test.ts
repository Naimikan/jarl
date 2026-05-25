import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@jarl/utils', () => ({
  getScrollableContainersByElement: vi.fn(),
  getScrollbarWidthByElement: vi.fn(),
}));

vi.mock('../helpers/extractElementFromRef', () => ({
  extractElementFromRef: vi.fn(),
}));

import { getScrollableContainersByElement, getScrollbarWidthByElement } from '@jarl/utils';

import { extractElementFromRef } from '../helpers/extractElementFromRef';
import { useDisableBackgroundScroll } from './useDisableBackgroundScroll';

describe('useDisableBackgroundScroll', () => {
  let rootElement: HTMLElement;

  beforeEach(() => {
    rootElement = document.createElement('div');
    document.body.appendChild(rootElement);
    vi.mocked(extractElementFromRef).mockReturnValue(rootElement);
    vi.mocked(getScrollbarWidthByElement).mockReturnValue(0);
  });

  afterEach(() => {
    document.body.removeChild(rootElement);
    vi.clearAllMocks();
  });

  describe('when disabled', () => {
    it('does not modify the root element when disabled is true', () => {
      renderHook(() => useDisableBackgroundScroll({ rootElement, disabled: true }));

      expect(rootElement.style.overflow).toBe('');
    });

    it('starts disabling scroll when disabled changes from true to false', () => {
      const { rerender } = renderHook(
        ({ disabled }) => useDisableBackgroundScroll({ rootElement, disabled }),
        { initialProps: { disabled: true } },
      );

      rerender({ disabled: false });

      expect(rootElement.style.overflow).toBe('hidden');
    });
  });

  describe('when rootElement is null', () => {
    it('does not throw', () => {
      vi.mocked(extractElementFromRef).mockReturnValue(null);

      expect(() =>
        renderHook(() => useDisableBackgroundScroll({ rootElement: null })),
      ).not.toThrow();
    });
  });

  describe('non-recursive mode (default)', () => {
    it('sets overflow to hidden on the root element', () => {
      renderHook(() => useDisableBackgroundScroll({ rootElement }));

      expect(rootElement.style.overflow).toBe('hidden');
    });

    it('adds scrollbar width to paddingRight when scrollbarWidth is greater than 0', () => {
      rootElement.style.paddingRight = '8px';
      vi.mocked(getScrollbarWidthByElement).mockReturnValue(16);

      renderHook(() => useDisableBackgroundScroll({ rootElement }));

      expect(rootElement.style.paddingRight).toBe('24px');
    });

    it('does not modify paddingRight when scrollbarWidth is 0', () => {
      rootElement.style.paddingRight = '8px';
      vi.mocked(getScrollbarWidthByElement).mockReturnValue(0);

      renderHook(() => useDisableBackgroundScroll({ rootElement }));

      expect(rootElement.style.paddingRight).toBe('8px');
    });

    describe('cleanup', () => {
      it('restores overflow to empty string on unmount when there was no initial overflow', () => {
        const { unmount } = renderHook(() => useDisableBackgroundScroll({ rootElement }));

        unmount();

        expect(rootElement.style.overflow).toBe('');
      });

      it('restores initial overflow on unmount', () => {
        rootElement.style.overflow = 'auto';

        const { unmount } = renderHook(() => useDisableBackgroundScroll({ rootElement }));

        unmount();

        expect(rootElement.style.overflow).toBe('auto');
      });

      it('restores initial overflowX on unmount', () => {
        rootElement.style.overflowX = 'scroll';

        const { unmount } = renderHook(() => useDisableBackgroundScroll({ rootElement }));

        unmount();

        expect(rootElement.style.overflowX).toBe('scroll');
      });

      it('restores initial overflowY on unmount', () => {
        rootElement.style.overflowY = 'scroll';

        const { unmount } = renderHook(() => useDisableBackgroundScroll({ rootElement }));

        unmount();

        expect(rootElement.style.overflowY).toBe('scroll');
      });

      it('restores initial paddingRight on unmount', () => {
        rootElement.style.paddingRight = '12px';
        vi.mocked(getScrollbarWidthByElement).mockReturnValue(16);

        const { unmount } = renderHook(() => useDisableBackgroundScroll({ rootElement }));

        unmount();

        expect(rootElement.style.paddingRight).toBe('12px');
      });

      it('does not restore overflow if it was not set initially', () => {
        const { unmount } = renderHook(() => useDisableBackgroundScroll({ rootElement }));

        unmount();

        expect(rootElement.style.overflowX).toBe('');
        expect(rootElement.style.overflowY).toBe('');
      });
    });
  });

  describe('recursive mode', () => {
    let containers: HTMLElement[];
    let firstContainer: HTMLElement;

    beforeEach(() => {
      containers = Array.from({ length: 2 }, () => {
        const el = document.createElement('div');
        rootElement.appendChild(el);
        return el;
      });

      firstContainer = containers[0] as HTMLElement;

      vi.mocked(getScrollableContainersByElement).mockReturnValue(containers);
    });

    it('sets overflow to hidden on each scrollable container', () => {
      renderHook(() => useDisableBackgroundScroll({ rootElement, recursive: true }));

      containers.forEach((container) => {
        expect(container.style.overflow).toBe('hidden');
      });
    });

    it('saves initial paddingRight in dataset for each container', () => {
      firstContainer.style.paddingRight = '8px';

      renderHook(() => useDisableBackgroundScroll({ rootElement, recursive: true }));

      expect(firstContainer.dataset.initialPaddingRight).toBe('8px');
    });

    it('saves initial overflow in dataset when container has overflow set', () => {
      firstContainer.style.overflow = 'auto';

      renderHook(() => useDisableBackgroundScroll({ rootElement, recursive: true }));

      expect(firstContainer.dataset.initialOverflow).toBe('auto');
    });

    it('does not save initial overflow in dataset when container has no overflow set', () => {
      renderHook(() => useDisableBackgroundScroll({ rootElement, recursive: true }));

      expect(firstContainer.dataset.initialOverflow).toBeUndefined();
    });

    it('adds scrollbar width to paddingRight of each container when scrollbarWidth is greater than 0', () => {
      firstContainer.style.paddingRight = '4px';
      vi.mocked(getScrollbarWidthByElement).mockReturnValue(16);

      renderHook(() => useDisableBackgroundScroll({ rootElement, recursive: true }));

      expect(firstContainer.style.paddingRight).toBe('20px');
    });

    describe('cleanup', () => {
      it('restores overflow on each container from dataset on unmount', () => {
        firstContainer.style.overflow = 'auto';

        const { unmount } = renderHook(() =>
          useDisableBackgroundScroll({ rootElement, recursive: true }),
        );

        unmount();

        expect(firstContainer.style.overflow).toBe('auto');
        expect(firstContainer.dataset.initialOverflow).toBeUndefined();
      });

      it('sets overflow to empty string when container had no initial overflow', () => {
        const { unmount } = renderHook(() =>
          useDisableBackgroundScroll({ rootElement, recursive: true }),
        );

        unmount();

        containers.forEach((container) => {
          expect(container.style.overflow).toBe('');
        });
      });

      it('restores paddingRight on each container from dataset on unmount', () => {
        firstContainer.style.paddingRight = '8px';
        vi.mocked(getScrollbarWidthByElement).mockReturnValue(16);

        const { unmount } = renderHook(() =>
          useDisableBackgroundScroll({ rootElement, recursive: true }),
        );

        unmount();

        expect(firstContainer.style.paddingRight).toBe('8px');
        expect(firstContainer.dataset.initialPaddingRight).toBeUndefined();
      });

      it('restores overflowX on each container from dataset on unmount', () => {
        firstContainer.style.overflowX = 'scroll';

        const { unmount } = renderHook(() =>
          useDisableBackgroundScroll({ rootElement, recursive: true }),
        );

        unmount();

        expect(firstContainer.style.overflowX).toBe('scroll');
        expect(firstContainer.dataset.initialOverflowHorizontal).toBeUndefined();
      });

      it('restores overflowY on each container from dataset on unmount', () => {
        firstContainer.style.overflowY = 'scroll';

        const { unmount } = renderHook(() =>
          useDisableBackgroundScroll({ rootElement, recursive: true }),
        );

        unmount();

        expect(firstContainer.style.overflowY).toBe('scroll');
        expect(firstContainer.dataset.initialOverflowVertical).toBeUndefined();
      });
    });
  });
});
