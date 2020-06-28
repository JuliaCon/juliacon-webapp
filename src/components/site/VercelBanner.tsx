import * as React from "react";
import { css } from "emotion";

import VercelLogo from "../../assets/vercel.svg";

export const VercelBanner = () => {
  return (
    <a
      href={"https://vercel.com/?utm_source=juliacon"}
      target={"_blank"}
      rel={"noreferrer noopener"}
      className={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 0.75rem;
        text-decoration: none;
      `}
    >
      <span>Powered by </span>
      <VercelLogo
        className={css`
          height: 1.5em;
          width: auto;
          margin-left: 0.5em;
        `}
      />
    </a>
  );
};
