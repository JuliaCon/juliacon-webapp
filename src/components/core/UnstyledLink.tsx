import React from "react";
import { Link, LinkProps } from "./Link";
import { css, cx } from "emotion";

export const UnstyledLink = (props: LinkProps) => {
  return (
    <Link
      {...props}
      className={cx(
        css`
          text-decoration: none;
        `,
        props.className
      )}
    />
  );
};
