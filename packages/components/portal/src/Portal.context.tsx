import { createContext } from 'react';

export const PortalContext = createContext<HTMLElement>(document.body);
