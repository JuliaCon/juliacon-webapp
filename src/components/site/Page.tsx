import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { css } from "emotion";
import { MainContentContainer } from "./MainContentContainer";
import { Sidebar } from "./Sidebar";

export const Page: React.FC = ({ children }) => {
  return (
    <div
      className={css`
        min-height: 100vh;
        display: flex;
        flex-flow: column nowrap;
      `}
    >
      <Header />
      <Sidebar />
      <MainContentContainer>{children}</MainContentContainer>

      <div
        // Spacer to force the footer to the bottom
        className={css`
          flex: 1;
          min-height: 4rem;
        `}
      />
      <Footer />
    </div>
  );
};
