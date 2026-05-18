import { isDefined } from './isDefined';
import { isNull } from './isNull';

export const isDefinedAndNotNull = (value?: unknown) => isDefined(value) && !isNull(value);
