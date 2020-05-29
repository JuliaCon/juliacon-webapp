export function pick<O extends object, K extends keyof O>(
  object: O,
  keys: readonly K[]
): { [k in K]: O[k] } {
  const o = {} as any;
  for (const key of keys) {
    o[key] = object[key];
  }
  return o;
}
