export const getDelay = (delay: number | [number, number]) => {
  if (typeof delay === 'number' && Number.isInteger(delay)) {
    return {
      start: delay,
      end: delay,
    };
  } else if (
    Array.isArray(delay) &&
    delay.length === 2 &&
    delay.every((d) => Number.isInteger(d))
  ) {
    return {
      start: delay[0],
      end: delay[1],
    };
  }

  throw new Error('Invalid delay value');
};
