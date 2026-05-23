import { type RefObject, useLayoutEffect } from 'react';

import { getScrollableContainersByElement, getScrollbarWidthByElement } from '@jarl/utils';

import { extractElementFromRef } from '../helpers/extractElementFromRef';

export interface UseDisableBackgroundScrollParams {
  disabled?: boolean;
  recursive?: boolean;
  rootElement: RefObject<HTMLElement | null> | HTMLElement | null;
}

export const useDisableBackgroundScroll = ({
  rootElement,
  disabled = false,
  recursive = false,
}: UseDisableBackgroundScrollParams) => {
  useLayoutEffect(() => {
    const finalRootElement = extractElementFromRef(rootElement);

    let initialOverflow: string;
    let initialOverflowHorizontal: string;
    let initialOverflowVertical: string;
    let initialPaddingRight: string;
    let scrollableContainers: HTMLElement[];

    if (!disabled && finalRootElement) {
      if (recursive) {
        scrollableContainers = getScrollableContainersByElement(finalRootElement);

        scrollableContainers.forEach((eachContainer) => {
          const scrollbarWidthByContainer = getScrollbarWidthByElement(eachContainer);

          eachContainer.dataset.initialPaddingRight = eachContainer.style.paddingRight;

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

          if (scrollbarWidthByContainer > 0) {
            const currentPadding = parseFloat(getComputedStyle(eachContainer).paddingRight) || 0;
            eachContainer.style.paddingRight = `${currentPadding + scrollbarWidthByContainer}px`;
          }
        });
      } else {
        const scrollbarWidth = getScrollbarWidthByElement(finalRootElement);

        if (finalRootElement.style.overflow) {
          initialOverflow = finalRootElement.style.overflow;
        }

        if (finalRootElement.style.overflowX) {
          initialOverflowHorizontal = finalRootElement.style.overflowX;
        }

        if (finalRootElement.style.overflowY) {
          initialOverflowVertical = finalRootElement.style.overflowY;
        }

        initialPaddingRight = finalRootElement.style.paddingRight;

        finalRootElement.style.overflow = 'hidden';

        if (scrollbarWidth > 0) {
          const currentPadding = parseFloat(getComputedStyle(finalRootElement).paddingRight) || 0;
          finalRootElement.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
        }
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

        finalRootElement.style.paddingRight = initialPaddingRight ?? '';

        if (recursive) {
          scrollableContainers.forEach((eachContainer) => {
            if (eachContainer.hasAttribute('data-initial-padding-right')) {
              eachContainer.style.paddingRight = eachContainer.dataset
                .initialPaddingRight as string;
              delete eachContainer.dataset.initialPaddingRight;
            }

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
