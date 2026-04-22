'use client';

import {
  LiveEditor as RlLiveEditor,
  LiveError as RlLiveError,
  LivePreview as RlLivePreview,
  LiveProvider as RlLiveProvider,
} from 'react-live';

import { AnchoredElement } from '@jarl/anchored-element';
import { Button } from '@jarl/button';

import styles from './index.module.scss';

interface LiveCodeProps {
  children: string;
  copyButton?: boolean;
  filename?: string;
  language: string;
}

const scope = {
  AnchoredElement,
  Button,
};

export const LiveEditor = ({ children, ...props }: LiveCodeProps) => {
  console.log({ props, children });

  return (
    <RlLiveProvider code={children} scope={scope}>
      <div className={styles['live-editor']}>
        <div />
        <RlLiveEditor className="font-mono" />
        <RlLivePreview />
      </div>
    </RlLiveProvider>
  );
};
