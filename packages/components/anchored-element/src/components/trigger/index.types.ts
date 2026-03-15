import type { ReactElement, Ref } from 'react';

export interface AnchorTriggerProps {
  children: ReactElement;
}

export type CloneAnchorTrigger = {
  ref: Ref<HTMLElement>;
  [key: string]: unknown;
};
