'use client';

import type { ReactNode } from 'react';

import './PreviewBox.css';

export interface PreviewBoxProps {
  children: ReactNode;
}

export const PreviewBox = ({ children }: PreviewBoxProps) => (
  <div className="preview-box">{children}</div>
);
