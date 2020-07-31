import React from "react";
import { css } from "emotion";

interface HSpaceProps {
  width?: string;
}
export const HSpace: React.FC<HSpaceProps> = ({ width = "1em" }) => {
  return (
    <span
      className={css`
        display: inline-block;
        width: ${width};
      `}
    />
  );
};
