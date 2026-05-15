import { cx } from '@jarl/utils';

import type { ReactNode } from 'react';

import './Body.styles.css';

export interface BodyProps {
  children: ReactNode;
  className?: string;
}

export const Body = ({ children, className }: BodyProps) => (
  <div className={cx('jarl-modal__body', className)}>{children}</div>
);

Body.displayName = 'Jarl.Modal.Content.Body';
