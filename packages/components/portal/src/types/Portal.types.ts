import type { AriaAttributes, ComponentPropsWithRef, PropsWithChildren } from 'react';

import type { DataAttributes } from '@jarl/utils';

export type AppendTo = string | (() => HTMLElement) | HTMLElement;

export interface PortalProps
  extends AriaAttributes,
    DataAttributes,
    PropsWithChildren<ComponentPropsWithRef<'div'>> {
  appendTo?: AppendTo;
}

export type NoReservedPortalProps = Omit<PortalProps, 'appendTo' | 'ref' | 'children' | 'key'>;
