import { cx } from '@jarl/styled-system/css';
import { modal } from '@jarl/styled-system/recipes';

import type { ReactNode } from 'react';

export interface BodyProps {
  children: ReactNode;
  className?: string;
}

export const Body = ({ children, className }: BodyProps) => (
  <div className={cx(modal().body, className)}>{children}</div>
);

Body.displayName = 'Jarl.Modal.Content.Body';
