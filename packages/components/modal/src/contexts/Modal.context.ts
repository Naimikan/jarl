import { createContext } from 'react';

import type { ModalContextType } from '../types/Modal.types';

export const ModalContext = createContext<ModalContextType | null>(null);
