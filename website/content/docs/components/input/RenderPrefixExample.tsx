'use client';

import { Input } from '@jarl/input';

export const RenderPrefixExample = () => {
  return <Input name="my-input" renderPrefix={() => <span>Prefix</span>} />;
};
