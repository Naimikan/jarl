import { createContext } from 'react';

export const PortalContext = createContext<HTMLElement | null>(
  typeof document !== 'undefined' ? document.body : null,
);
