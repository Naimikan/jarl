import type { ReactNode } from 'react';

import './Prose.css';

export interface ProseProps {
  children?: ReactNode;
}

export const Prose = ({ children }: ProseProps) => <main className="main-content">{children}</main>;
