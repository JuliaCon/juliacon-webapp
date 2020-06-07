import React from "react";
import { invariant } from "../utils/invariant";

export function useArrayChoice<T>(
  array: readonly T[],
  initialIndex: number | (() => number)
) {
  const [index, _setIndex] = React.useState<number>(initialIndex);

  const truncateIndex = React.useCallback(
    (index: number) => {
      invariant(Number.isInteger(index), `Expected integer in useArrayChoice`);
      if (index < 0) return 0;
      if (index >= array.length) return array.length - 1;
      return index;
    },
    [array.length]
  );

  const incr = React.useCallback(
    (n: number) => {
      _setIndex((index) => truncateIndex(index + n));
    },
    [truncateIndex]
  );

  return {
    index: truncateIndex(index),
    value: array[index],
    next: React.useCallback(() => incr(1), [incr]),
    previous: React.useCallback(() => incr(-1), [incr]),
  };
}
