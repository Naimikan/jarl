export const getPrecisionByNumber = (number: number) => {
  if (!number) {
    return 0;
  }

  const [, decimals = ''] = number.toString().split('.');

  return decimals.length;
};
