import type { ComponentPropsWithRef, PropsWithChildren } from 'react';

export type AppendTo = string | (() => HTMLElement) | HTMLElement;

export interface PortalProps extends PropsWithChildren<ComponentPropsWithRef<'div'>> {
  appendTo?: AppendTo;
  [key: `data-${string}`]: string | undefined;
  [key: `aria-${string}`]: string | number | boolean | undefined;
}
