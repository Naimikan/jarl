import { useContext } from 'react';

import { AnchoredElementContext } from '../components/AnchoredElement';

export const useAnchoredContext = () => {
  const anchoredContext = useContext(AnchoredElementContext);

  if (!anchoredContext) {
    throw new Error('useAnchoredContext must be used within an AnchoredElement.');
  }

  return anchoredContext;
};
