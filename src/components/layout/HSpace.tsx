import React from "react";
import { css } from "emotion";

interface HSpaceProps {
  width?: string;
}
export const HSpace: React.FC<HSpaceProps> = ({ width = "1em" }) => {
  return (
    <div
      className={css`
        display: inline-block;
        width: ${width};
      `}
    />
  );
};
