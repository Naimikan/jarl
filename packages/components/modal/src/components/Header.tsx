/// <reference path="../../../../typescript-config/declarations.d.ts" />

import classNames from 'classnames';

import type { ReactNode } from 'react';

import './Header.styles.css';

export interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => (
  <div className={classNames('jarl-modal__header', className)}>{children}</div>
);

Header.displayName = 'Jarl.Modal.Content.Header';
