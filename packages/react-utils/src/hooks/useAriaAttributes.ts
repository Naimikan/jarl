export type UseAriaAttributesPropsParam = Record<string, unknown>;

export const useAriaAttributes = (
  props: UseAriaAttributesPropsParam,
  excludedAttributes?: string[],
) => {
  const ariaAttributes = Object.fromEntries(
    Object.entries(props)
      .filter(
        ([propName]) => propName.match(/^aria-/i) && !(excludedAttributes || []).includes(propName),
      )
      .map(([propName, propValue]) => [propName.toLowerCase(), propValue]),
  );

  return ariaAttributes;
};
