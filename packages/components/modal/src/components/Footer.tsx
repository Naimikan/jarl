import type { ReactNode } from 'react';

import { cx } from '@jarl/utils';

import './Footer.styles.css';

export interface FooterProps {
  children: ReactNode;
  className?: string;
}

export const Footer = ({ children, className }: FooterProps) => (
  <div className={cx('jarl-modal__footer', className)}>{children}</div>
);

Footer.displayName = 'Jarl.Modal.Content.Footer';
