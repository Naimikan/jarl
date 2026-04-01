import { useContext } from 'react';

import { ModalContext } from '../Modal';

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('useModalContext must be used within a Modal.');
  }

  return modalContext;
};
