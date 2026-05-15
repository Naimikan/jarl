import { cx } from '@jarl/utils';

import type { ReactNode } from 'react';

import './Header.styles.css';

export interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => (
  <div className={cx('jarl-modal__header', className)}>{children}</div>
);

Header.displayName = 'Jarl.Modal.Content.Header';
