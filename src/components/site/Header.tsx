import React from "react";
import { css, cx } from "emotion";

import Logo from "../../assets/logo.svg";

import { Nav } from "./Nav";
import { HSpace } from "../layout";
import { Link } from "../core";
import { mobileOnly } from "../../utils/css";

export const Header: React.FC = () => {
  return (
    <header
      className={cx(
        css`
          border-bottom: 1px solid #ccc;
        `
      )}
    >
      <div
        className={cx(
          css`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            max-width: 1200px;
            margin: 0 auto;
          `,
          mobileOnly(
            css`
              flex-flow: column nowrap;
            `
          )
        )}
      >
        <Link
          href={"/"}
          className={css`
            display: block;
          `}
        >
          <Logo
            className={css`
              height: 100%;
              max-height: 4rem;
              width: auto;
              padding: 0.5rem;
            `}
          />
        </Link>
        <HSpace width={"2rem"} />
        <Nav />
      </div>
    </header>
  );
};
