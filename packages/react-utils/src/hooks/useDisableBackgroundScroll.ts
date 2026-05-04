import { useLayoutEffect } from 'react';

import { getScrollableContainersByElement } from '@jarl/utils';

export interface UseDisableBackgroundScrollParams {
  disabled?: boolean;
  recursive?: boolean;
  rootElement: string | HTMLElement | null;
}

export const useDisableBackgroundScroll = ({
  rootElement,
  disabled = false,
  recursive = false,
}: UseDisableBackgroundScrollParams) => {
  useLayoutEffect(() => {
    const finalRootElement =
      rootElement && typeof rootElement === 'string'
        ? document.getElementById(rootElement)
        : (rootElement as HTMLElement | null);

    let initialOverflow: string;
    let initialOverflowHorizontal: string;
    let initialOverflowVertical: string;
    let scrollableContainers: HTMLElement[];

    if (!disabled && finalRootElement) {
      if (finalRootElement.style.overflow) {
        initialOverflow = finalRootElement.style.overflow;
      }

      if (finalRootElement.style.overflowX) {
        initialOverflowHorizontal = finalRootElement.style.overflowX;
      }

      if (finalRootElement.style.overflowY) {
        initialOverflowVertical = finalRootElement.style.overflowY;
      }

      if (recursive) {
        scrollableContainers = getScrollableContainersByElement(finalRootElement);

        scrollableContainers.forEach((eachContainer) => {
          if (eachContainer.style.overflow) {
            eachContainer.dataset.initialOverflow = eachContainer.style.overflow;
          }

          if (eachContainer.style.overflowX) {
            eachContainer.dataset.initialOverflowHorizontal = eachContainer.style.overflowX;
          }

          if (eachContainer.style.overflowY) {
            eachContainer.dataset.initialOverflowVertical = eachContainer.style.overflowY;
          }

          eachContainer.style.overflow = 'hidden';
        });
      } else {
        finalRootElement.style.overflow = 'hidden';
      }
    }

    return () => {
      if (!disabled && finalRootElement) {
        finalRootElement.style.overflow = '';

        if (initialOverflow) {
          finalRootElement.style.overflow = initialOverflow;
        }

        if (initialOverflowHorizontal) {
          finalRootElement.style.overflowX = initialOverflowHorizontal;
        }

        if (initialOverflowVertical) {
          finalRootElement.style.overflowY = initialOverflowVertical;
        }

        if (recursive) {
          scrollableContainers.forEach((eachContainer) => {
            if (eachContainer.hasAttribute('data-initial-overflow')) {
              eachContainer.style.overflow = eachContainer.dataset.initialOverflow as string;
              delete eachContainer.dataset.initialOverflow;
            } else {
              eachContainer.style.overflow = '';
            }

            if (eachContainer.hasAttribute('data-initial-overflow-horizontal')) {
              eachContainer.style.overflowX = eachContainer.dataset
                .initialOverflowHorizontal as string;
              delete eachContainer.dataset.initialOverflowHorizontal;
            }

            if (eachContainer.hasAttribute('data-initial-overflow-vertical')) {
              eachContainer.style.overflowY = eachContainer.dataset
                .initialOverflowVertical as string;
              delete eachContainer.dataset.initialOverflowVertical;
            }
          });
        }
      }
    };
  }, [rootElement, disabled, recursive]);
};
