import { cx } from '@jarl/styled-system/css';
import { modal } from '@jarl/styled-system/recipes';

import type { ReactNode } from 'react';

export interface FooterProps {
  children: ReactNode;
  className?: string;
}

export const Footer = ({ children, className }: FooterProps) => (
  <div className={cx(modal().footer, className)}>{children}</div>
);

Footer.displayName = 'Jarl.Modal.Content.Footer';
