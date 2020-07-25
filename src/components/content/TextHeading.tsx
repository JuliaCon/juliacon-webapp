import React from "react";
import { css, cx } from "emotion";

export interface TextHeadingProps {
  children: React.ReactNode;
  level: "h1" | "h2" | "h3";
}

export const TextHeading = ({ children, level }: TextHeadingProps) => {
  const style = cx(
    css`
      font-family: "Patua One", sans-serif;
    `,
    styles[level]
  );

  const Component = level;
  return <Component className={style}>{children}</Component>;
};

const styles = {
  h1: css`
    font-size: 2rem;
  `,
  h2: css`
    font-size: 1.5rem;
  `,
  h3: css`
    font-size: 1.25rem;
  `,
};
