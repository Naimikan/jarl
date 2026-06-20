import { isNumericChar } from './isNumericChar';

export const sanitizeInputValue = (value: string) => value.split('').filter(isNumericChar).join('');
