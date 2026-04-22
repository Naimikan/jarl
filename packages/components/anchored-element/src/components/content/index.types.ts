import type { ReactNode } from 'react';

export type ChildrenFunction = {
  show?: () => void;
  hide?: () => void;
};

export type ChildrenAsFunction = (params?: ChildrenFunction) => ReactNode;

export interface AnchorContentProps {
  children: ReactNode | ChildrenAsFunction;
}
