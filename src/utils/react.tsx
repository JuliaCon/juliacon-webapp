/**
 * Create a React fragment from the array of elements.
 *
 * This is useful when rendering array items that don't need a key attribute.
 */
import React from "react";

export function arrayToFragment(elts: readonly React.ReactNode[]) {
  return React.createElement(React.Fragment, {}, ...elts);
}
