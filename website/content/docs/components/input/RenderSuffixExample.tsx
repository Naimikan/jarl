'use client';

import { Input } from '@jarl/input';

export const RenderSuffixExample = () => {
  return <Input name="my-input" renderSuffix={() => <span>Suffix</span>} />;
};
