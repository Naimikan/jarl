import classNames from 'classnames';

import type { ReactNode } from 'react';

import './Footer.styles.css';

export interface FooterProps {
  children: ReactNode;
  className?: string;
}

export const Footer = ({ children, className }: FooterProps) => (
  <div className={classNames('jarl-modal__footer', className)}>{children}</div>
);

Footer.displayName = 'Jarl.Modal.Content.Footer';
