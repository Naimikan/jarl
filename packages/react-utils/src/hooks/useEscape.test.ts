import { fireEvent } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

vi.mock('./useLatest', () => ({
  useLatest: (value: unknown) => ({ current: value }),
}));

import { useEscape } from './useEscape';

describe('useEscape', () => {
  let callbackMock: Mock<(event: KeyboardEvent) => void>;
  let callback: (event: KeyboardEvent) => void;

  beforeEach(() => {
    callbackMock = vi.fn();
    callback = (event) => callbackMock(event);
  });

  describe('when Escape is pressed', () => {
    it('calls callback when event.key is Escape', () => {
      renderHook(() => useEscape({ callback }));

      fireEvent.keyDown(window, { key: 'Escape' });

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('calls callback when event.code is Escape', () => {
      renderHook(() => useEscape({ callback }));

      fireEvent.keyDown(window, { code: 'Escape' });

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('does not call callback for other keys', () => {
      renderHook(() => useEscape({ callback }));

      fireEvent.keyDown(window, { key: 'Enter' });
      fireEvent.keyDown(window, { key: 'Tab' });
      fireEvent.keyDown(window, { key: 'ArrowDown' });

      expect(callbackMock).not.toHaveBeenCalled();
    });
  });

  describe('when disabled', () => {
    it('does not call callback when disabled is true', () => {
      renderHook(() => useEscape({ callback, disabled: true }));

      fireEvent.keyDown(window, { key: 'Escape' });

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('starts listening when disabled changes from true to false', () => {
      const { rerender } = renderHook(({ disabled }) => useEscape({ callback, disabled }), {
        initialProps: { disabled: true },
      });

      rerender({ disabled: false });
      fireEvent.keyDown(window, { key: 'Escape' });

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('stops listening when disabled changes from false to true', () => {
      const { rerender } = renderHook(({ disabled }) => useEscape({ callback, disabled }), {
        initialProps: { disabled: false },
      });

      rerender({ disabled: true });
      fireEvent.keyDown(window, { key: 'Escape' });

      expect(callbackMock).not.toHaveBeenCalled();
    });
  });

  describe('capture option', () => {
    it('registers listener without capture by default', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      renderHook(() => useEscape({ callback }));

      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), false);
    });

    it('registers listener with capture when capture is true', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      renderHook(() => useEscape({ callback, capture: true }));

      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), true);
    });

    it('removes listener with the same capture value used to register', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() => useEscape({ callback, capture: true }));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), true);
    });
  });

  describe('cleanup', () => {
    it('does not call callback after unmount', () => {
      const { unmount } = renderHook(() => useEscape({ callback }));

      unmount();
      fireEvent.keyDown(window, { key: 'Escape' });

      expect(callbackMock).not.toHaveBeenCalled();
    });

    it('removes keydown listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() => useEscape({ callback }));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), false);
    });
  });
});
