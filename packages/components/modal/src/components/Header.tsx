import { cx } from '@jarl/styled-system/css';
import { modal } from '@jarl/styled-system/recipes';

import type { ReactNode } from 'react';

export interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => (
  <div className={cx(modal().header, className)}>{children}</div>
);

Header.displayName = 'Jarl.Modal.Content.Header';
