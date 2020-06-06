type CriterionFn<T> = (elt: T) => boolean;
type FalseyValue = undefined | null | false | "";

/**
 * Filter an array using multiple criterion functions. The element is excluded
 * if any criterion function returns false.
 *
 * Criterion functions maybe be `undefined`/`null`/falsey to enable a convenient
 * api.
 *
 * @example
 *   filterCriteria(people, [
 *     (person) => person.age >= 21,
 *     lastNameFilter && (person) => person.lastName === lastNameFilter,
 *   ]);
 */
export function filterCriteria<T>(
  array: readonly T[],
  criteria: ReadonlyArray<FalseyValue | CriterionFn<T>>
) {
  const criteriaFiltered = criteria.filter(
    (criterion): criterion is CriterionFn<T> => {
      return typeof criterion === "function";
    }
  );
  return array.filter((elt) => {
    for (const criterion of criteriaFiltered) {
      if (!criterion(elt)) {
        return false;
      }
    }
    return true;
  });
}
