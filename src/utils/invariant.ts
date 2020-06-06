export class InvariantError extends Error {}

export function nullthrows<T>(x: T, msg?: string): NonNullable<T>;
export function nullthrows<T>(x: T, msg?: string): asserts x is NonNullable<T>;
export function nullthrows<T>(x: T, msg: string = "Unexpected null.") {
  if (x === undefined || x === null) {
    throw new InvariantError(msg);
  }
  return x;
}

export function invariant(
  condition: boolean,
  message = "Invariant failure"
): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}

export function isdefined<T>(x: T): x is NonNullable<T> {
  return !(x === null || x === undefined);
}
