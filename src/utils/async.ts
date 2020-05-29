export async function asyncMap<TElt, TResult>(
  array: readonly TElt[],
  mapper: (elt: TElt, idx: number) => Promise<TResult>
): Promise<TResult[]> {
  return Promise.all(array.map(mapper));
}
