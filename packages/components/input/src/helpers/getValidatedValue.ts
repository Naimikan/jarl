import { isDefinedAndNotNull } from '@jarl/utils';

export interface GetValidatedValueParams {
  max: number;
  min: number;
  value?: number;
}

export const getValidatedValue = ({ value, min, max }: GetValidatedValueParams) => {
  if (isDefinedAndNotNull(value)) {
    return Math.max(min, Math.min(max, value));
  }

  return value;
};
