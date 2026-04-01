import { Portal } from '@jarl/portal';
import { cx } from '@jarl/styled-system/css';
import { modal } from '@jarl/styled-system/recipes';

import { useModalContext } from '../hooks/useModalContext';

export interface BackdropProps {
  className?: string;
}

export const Backdrop = ({ className }: BackdropProps) => {
  const { backdropId, appendTo, animationState } = useModalContext();

  return (
    <Portal
      appendTo={appendTo}
      aria-hidden={true}
      className={cx(modal().backdrop, className)}
      data-state={animationState}
      id={backdropId}
    />
  );
};

Backdrop.displayName = 'Jarl.Modal.Backdrop';
