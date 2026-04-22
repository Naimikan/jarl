import { styled } from '@jarl/styled-system/jsx';

import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface WrapperProps extends ComponentPropsWithRef<'span'> {
  children: ReactNode;
}

export const Wrapper = ({ children, ref }: WrapperProps) => (
  <styled.span ref={ref} tabIndex={0}>
    {children}
  </styled.span>
);
