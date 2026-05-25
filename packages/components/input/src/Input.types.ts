import type { ComponentPropsWithoutRef } from 'react';

type WithId = { id: string; name?: string };
type WithName = { name: string; id?: string };

type InputWithIdOrNameProp = WithId | WithName;

export type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'name'> &
  InputWithIdOrNameProp & {
    className?: string;
    invalid?: boolean;
    focusable?: boolean;
  };
