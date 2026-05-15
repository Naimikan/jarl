import classNames from 'classnames';

import { useModalContext } from '../hooks/useModalContext';

import type { ComponentProps, ElementType, PropsWithChildren } from 'react';

import './Title.styles.css';

const DEFAULT_TAG = 'h2';

interface TitleBaseProps {
  className?: string;
}

export type TitleProps<T extends ElementType = typeof DEFAULT_TAG> =
  PropsWithChildren<TitleBaseProps> &
    Omit<ComponentProps<T>, keyof TitleBaseProps | 'as'> & {
      as?: T;
    };

export const Title = <T extends ElementType = typeof DEFAULT_TAG>({
  as,
  children,
  className,
}: TitleProps<T>) => {
  const { titleId } = useModalContext();

  const ComponentTag = as || DEFAULT_TAG;

  return (
    <ComponentTag className={classNames('jarl-modal__title', className)} id={titleId}>
      {children}
    </ComponentTag>
  );
};

Title.displayName = 'Jarl.Modal.Content.Header.Title';
