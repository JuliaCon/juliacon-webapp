import * as React from "react";
import { css } from "emotion";
import { VSpace } from "./layout";

export const ComingSoon = () => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <VSpace height="2rem" />
      <h2
        className={css`
          font-size: 1.5rem;
          font-weight: bold;
        `}
      >
        Coming Soon!
      </h2>
      <VSpace />
      <p>
        Please feel free to{" "}
        <a href="https://github.com/JuliaCon/juliacon-webapp">
          contribute on GitHub
        </a>
      </p>
    </div>
  );
};
