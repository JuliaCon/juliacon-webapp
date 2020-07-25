import React from "react";
import { VSpace } from "./VSpace";

export const VSpaceBetween = ({
  children,
  space,
  spaceAbove,
}: {
  children: React.ReactNode;
  space?: string;
  spaceAbove?: boolean;
}) => {
  const length = React.Children.count(children);
  const array = React.Children.map(children, (child, idx) => (
    <>
      {child}
      {idx === length - 1 ? null : <VSpace height={space} />}
    </>
  ));
  return (
    <>
      {spaceAbove ? <VSpace height={space} /> : null}
      {array}
    </>
  );
};
