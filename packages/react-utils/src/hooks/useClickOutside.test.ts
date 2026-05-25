import { fireEvent } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('../helpers/extractElementFromRef', () => ({
  extractElementFromRef: vi.fn(),
}));

vi.mock('./useLatest', () => ({
  useLatest: vi.fn((value: unknown) => ({ current: value })),
}));

import { extractElementFromRef } from '../helpers/extractElementFromRef';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  let rootElement: HTMLElement;
  let outsideElement: HTMLElement;
  let callbackMock: Mock<(event: MouseEvent | TouchEvent) => void>;
  let callback: (event: MouseEvent | TouchEvent) => void;

  beforeEach(() => {
    rootElement = document.createElement('div');
    outsideElement = document.createElement('div');
    document.body.appendChild(rootElement);
    document.body.appendChild(outsideElement);
    callbackMock = vi.fn();
    callback = (event) => callbackMock(event);
    vi.mocked(extractElementFromRef).mockReturnValue(rootElement);
  });

  afterEach(() => {
    document.body.removeChild(rootElement);
    document.body.removeChild(outsideElement);
  });

  describe('mousedown events', () => {
    it('calls callback when clicking outside the root element', () => {
      renderHook(() => useClickOutside({ callback, rootElement }));

      fireEvent.mouseDown(outsideElement);

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('does not call callback when clicking on the root element', () => {
      renderHook(() => useClickOutside({ callback, rootElement }));

      fireEvent.mouseDown(rootElement);

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('does not call callback when clicking on a child of the root element', () => {
      const childElement = document.createElement('span');
      rootElement.appendChild(childElement);

      renderHook(() => useClickOutside({ callback, rootElement }));

      fireEvent.mouseDown(childElement);

      expect(callbackMock).not.toHaveBeenCalled();
    });
  });

  describe('touchstart events', () => {
    it('calls callback when touching outside the root element', () => {
      renderHook(() => useClickOutside({ callback, rootElement }));

      fireEvent.touchStart(outsideElement);

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('does not call callback when touching the root element', () => {
      renderHook(() => useClickOutside({ callback, rootElement }));

      fireEvent.touchStart(rootElement);

      expect(callbackMock).not.toHaveBeenCalled();
    });
  });

  describe('when disabled', () => {
    it('does not call callback on mousedown when disabled is true', () => {
      renderHook(() => useClickOutside({ callback, disabled: true, rootElement }));

      fireEvent.mouseDown(outsideElement);

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('does not call callback on touchstart when disabled is true', () => {
      renderHook(() => useClickOutside({ callback, disabled: true, rootElement }));

      fireEvent.touchStart(outsideElement);

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('starts listening when disabled changes from true to false', () => {
      const { rerender } = renderHook(
        ({ disabled }) => useClickOutside({ callback, disabled, rootElement }),
        { initialProps: { disabled: true } },
      );

      rerender({ disabled: false });
      fireEvent.mouseDown(outsideElement);

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('stops listening when disabled changes from false to true', () => {
      const { rerender } = renderHook(
        ({ disabled }) => useClickOutside({ callback, disabled, rootElement }),
        { initialProps: { disabled: false } },
      );

      rerender({ disabled: true });
      fireEvent.mouseDown(outsideElement);

      expect(callbackMock).not.toHaveBeenCalled();
    });
  });

  describe('when rootElement is null', () => {
    it('does not call callback on mousedown', () => {
      vi.mocked(extractElementFromRef).mockReturnValue(null);

      renderHook(() => useClickOutside({ callback, rootElement: null }));
      fireEvent.mouseDown(outsideElement);

      expect(callbackMock).not.toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('does not call callback after unmount', () => {
      const { unmount } = renderHook(() => useClickOutside({ callback, rootElement }));

      unmount();
      fireEvent.mouseDown(outsideElement);

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('removes mousedown and touchstart listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() => useClickOutside({ callback, rootElement }));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    });
  });
});
