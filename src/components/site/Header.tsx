import React from "react";
import { css } from "emotion";

import Logo from "../../assets/logo.svg";

import { Nav } from "./Nav";
import { HSpace } from "../layout";

export const Header: React.FC = () => {
  return (
    <header
      className={css`
        height: 4rem;
        border-bottom: 1px solid #ccc;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          max-width: 1200px;
          margin: 0 auto;
        `}
      >
        <Logo
          className={css`
            height: 100%;
            width: auto;
            padding: 0.5rem;
          `}
        />
        <HSpace width={"2rem"} />
        <Nav />
      </div>
    </header>
  );
};
