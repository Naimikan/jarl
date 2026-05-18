import { createContext } from 'react';

import { isDefined } from '@jarl/utils';

export const PortalContext = createContext<HTMLElement | null>(
  isDefined(document) ? document.body : null,
);
