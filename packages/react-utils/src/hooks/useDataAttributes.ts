export type UseDataAttributesPropsParam = Record<string, unknown>;

export const useDataAttributes = (
  props: UseDataAttributesPropsParam,
  excludedAttributes?: string[],
) => {
  const dataAttributes = Object.fromEntries(
    Object.entries(props)
      .filter(
        ([propName]) => propName.match(/^data-/i) && !(excludedAttributes || []).includes(propName),
      )
      .map(([propName, propValue]) => [propName.toLowerCase(), propValue]),
  );

  return dataAttributes;
};
