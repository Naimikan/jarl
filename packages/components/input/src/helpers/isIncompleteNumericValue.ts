const INCOMPLETE_VALUE_REGEX = /^[+-]$|^[+-]?\d*\.$|^[+-]?\d+[eE][+-]?$/;

export const isIncompleteNumericValue = (value: string) => INCOMPLETE_VALUE_REGEX.test(value);
