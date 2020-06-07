import React from "react";
import { css } from "emotion";

interface VSpaceProps {
  height?: string;
}
export const VSpace: React.FC<VSpaceProps> = ({ height = "1em" }) => {
  return (
    <div
      className={css`
        height: ${height};
      `}
    />
  );
};
