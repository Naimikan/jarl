import type { ReactNode } from 'react';

import './index.styles.css';

export interface ContentProps {
  children?: ReactNode;
}

export const Content = ({ children }: ContentProps) => (
  <main className="main-content">{children}</main>
);
