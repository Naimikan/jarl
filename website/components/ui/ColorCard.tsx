'use client';

import { useState } from 'react';

import { AnchoredElement } from '@jarl/anchored-element';
import { cx } from '@jarl/utils';

import './ColorCard.css';

export interface ColorCardProps {
  colorHex: string;
  colorName: string;
  selected?: boolean;
}

export const ColorCard = ({ colorName, colorHex }: ColorCardProps) => {
  const [selected, setSelected] = useState(false);

  const popoverContent = (
    <>
      <div className="color-popover-banner" style={{ backgroundColor: colorHex }} />
      <p className="color-popover-name">{colorName}</p>
      <p className="color-popover-hex">{colorHex}</p>
      <div className="color-popover-css-var-container">
        <span className="color-popover-css-var-title">CSS variable</span>
        <code className="color-popover-css-var-name">--jarl-color-{colorName}</code>
      </div>
    </>
  );

  return (
    <AnchoredElement
      allowedPositions={['top', 'bottom']}
      className="color-popover"
      content={popoverContent}
      delay={[100, 100]}
      onStartClose={() => setSelected(false)}
      onStartOpen={() => setSelected(true)}
      position="top"
      triggerEvents="click"
      withArrow
    >
      <div className={cx('color-card', { selected })}>
        <div className="color-container" style={{ backgroundColor: colorHex }} />
        <div className="color-info-container">
          <span className="color-name">{colorName}</span>
          <span className="color-hex">{colorHex}</span>
        </div>
      </div>
    </AnchoredElement>
  );
};
