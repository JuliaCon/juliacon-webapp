import { css } from "emotion";
import React from "react";

export const PageHeading: React.FC = ({ children }) => {
  return (
    <div>
      <h1
        className={css`
          font-size: 2rem;
          font-family: "Patua One", sans-serif;
        `}
      >
        {children}
      </h1>
      <div
        className={css`
          padding: 0.5rem 0 0 0;
        `}
      >
        <div
          className={css`
            border-top: 0.5rem solid var(--julia-purple);
            width: 6rem;
          `}
        />
      </div>
    </div>
  );
};
