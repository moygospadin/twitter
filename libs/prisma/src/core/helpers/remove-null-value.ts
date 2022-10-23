export function removeNullValue(object: Record<string, any>): Record<string, any> {
  return Object.entries(object).reduce((accumulator, [key, value]) => {
    if (value === null) {
      return accumulator;
    }

    accumulator[key] = value;

    return accumulator;
  }, {});
}
