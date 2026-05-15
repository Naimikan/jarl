type ClassInput =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassInput[]
  | Record<string, boolean | number | undefined | null>;

export const cx = (...classesInput: ClassInput[]) => {
  const classes: string[] = [];

  for (const classInput of classesInput) {
    if (classInput) {
      if (typeof classInput === 'string' || typeof classInput === 'number') {
        classes.push(String(classInput));
      } else if (Array.isArray(classInput)) {
        const recursiveResult = cx(...classInput);

        if (recursiveResult) {
          classes.push(recursiveResult);
        }
      } else if (typeof classInput === 'object') {
        for (const key in classInput) {
          if (Object.hasOwn(classInput, key) && classInput[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
};
