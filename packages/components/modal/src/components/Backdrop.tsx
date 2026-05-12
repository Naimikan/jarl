/// <reference path="../../../../typescript-config/declarations.d.ts" />

import classNames from 'classnames';

import { Portal } from '@jarl/portal';

import { useModalContext } from '../hooks/useModalContext';

import './Backdrop.styles.css';

export interface BackdropProps {
  className?: string;
}

export const Backdrop = ({ className }: BackdropProps) => {
  const { backdropId, appendTo, animationState } = useModalContext();

  return (
    <Portal
      appendTo={appendTo}
      aria-hidden={true}
      className={classNames('jarl-modal__backdrop', className)}
      data-state={animationState}
      id={backdropId}
    />
  );
};

Backdrop.displayName = 'Jarl.Modal.Backdrop';
