import React from "react";

export function useWindowCloseListener(
  fn?: (event: Event) => void,
  { register = true } = {}
) {
  React.useEffect(() => {
    if (!register || !fn) return;
    const listener = (e: Event) => {
      fn(e);

      // To prevent the window from begin unloaded, we need to set returnValue
      // (which is not super idiomatic in React). This will cause the browser
      // to show the "You may have unsaved changed" dialogue.
      if (!e.returnValue && e.defaultPrevented) {
        e.returnValue = true;
      }
    };
    window.addEventListener("beforeunload", listener);
    return () => window.removeEventListener("beforeunload", listener);
  }, [fn, register]);
}
