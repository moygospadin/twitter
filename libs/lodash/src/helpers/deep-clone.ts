export function deepClone<T extends Record<string, any> | Record<string, any>[]>(target: T): T {
  if (!target) {
    return target;
  }

  if (Array.isArray(target)) {
    const structureToCopy = target.slice();

    return structureToCopy.map((arrayElement) => deepClone(arrayElement)) as T;
  }

  if (typeof target === 'object') {
    const structureToCopy = {} as T;

    for (const key of Object.keys(target)) {
      structureToCopy[key] = deepClone(target[key]);
    }

    return structureToCopy;
  }

  return target;
}
