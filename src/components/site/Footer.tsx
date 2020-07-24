import React from "react";
import { css } from "emotion";

import { VercelBanner } from "./VercelBanner";

export const Footer: React.FC = () => {
  return (
    <footer
      className={css`
        padding: 1.5rem;
        background: #f9f9f9;
        margin-left: calc(-50vw + 50%);
        margin-right: calc(-50vw + 50%);
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          max-width: 100%;
          margin: 0 auto;
        `}
      >
        <div
          className={css`
            margin-left: auto;
          `}
        >
          <VercelBanner />
        </div>
      </div>
    </footer>
  );
};
