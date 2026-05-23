import { Button } from '@jarl/button';
import { cx } from '@jarl/utils';

import { useModalContext } from '../hooks/useModalContext';

import './CloseButton.styles.css';

export interface CloseButtonProps {
  className?: string;
}

export const CloseButton = ({ className }: CloseButtonProps) => {
  const { onCloseRequested } = useModalContext();

  return (
    <Button className={cx('jarl-modal__close-button', className)} onClick={onCloseRequested}>
      <svg
        aria-hidden="true"
        className="jarl-modal__close-button-icon"
        role="img"
        viewBox="0 0 14 14"
      >
        <path
          d="M2.05025 0.636033L6.99914 5.58514L11.9497 0.636033C12.3403 0.245509 12.9734 0.245509 13.364 0.636033C13.7545
      1.02656 13.7545 1.65972 13.364 2.05025L8.41414 6.99914L13.364 11.9497C13.7545 12.3403 13.7545 12.9734 13.364
      13.364C12.9734 13.7545 12.3403 13.7545 11.9497 13.364L6.99914 8.41414L2.05025 13.364C1.65972 13.7545 1.02656 13.7545
      0.636033 13.364C0.245509 12.9734 0.245509 12.3403 0.636033 11.9497L5.58514 6.99914L0.636033 2.05025C0.245509 1.65972
      0.245509 1.02656 0.636033 0.636033C1.02656 0.245509 1.65972 0.245509 2.05025 0.636033Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
};

CloseButton.displayName = 'Jarl.Modal.CloseButton';
