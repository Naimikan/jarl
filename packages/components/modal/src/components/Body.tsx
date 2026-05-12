/// <reference path="../../../../typescript-config/declarations.d.ts" />

import classNames from 'classnames';

import type { ReactNode } from 'react';

import './Body.styles.css';

export interface BodyProps {
  children: ReactNode;
  className?: string;
}

export const Body = ({ children, className }: BodyProps) => (
  <div className={classNames('jarl-modal__body', className)}>{children}</div>
);

Body.displayName = 'Jarl.Modal.Content.Body';
