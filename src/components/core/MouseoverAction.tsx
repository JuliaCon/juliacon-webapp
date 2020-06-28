import React from "react";

interface MouseoverActionProps {
  action: () => void;
  as?: "div" | "span";
  children: React.ReactNode;
}

/**
 * Trigger an action when the user has their mouse over an element.
 */
export const MouseoverAction = ({
  action,
  as: Component = "div",
  children,
}: MouseoverActionProps) => {
  // We want to check if the mouse is inside the element when the the component
  // is mounted (in addition to listening for the `onMouseEnter` event)
  const [elt, setElt] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => {
    if (!elt || typeof elt.matches === "undefined") return;
    if (elt.matches(":hover")) {
      action();
    }
  });

  return (
    <Component ref={(elt) => setElt(elt)} onMouseEnter={action}>
      {children}
    </Component>
  );
};
