import { css } from "emotion";
import React from "react";
import { Sidebar } from "./Sidebar";
export const MainContentContainer: React.FC = ({ children }) => {
  return (
    <div
      className={css`
        margin: 0 auto;
        padding: 1rem;
        width: 100%;
        max-width: 1000px;
      `}
    >
      <div className={"content"}>{children}</div>
      <Sidebar />
    </div>
  );
};
