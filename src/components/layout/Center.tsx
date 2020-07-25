import React from "react";
import { css } from "emotion";

export const Center: React.FC = ({ children }) => {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
      `}
    >
      {children}
    </div>
  );
};
