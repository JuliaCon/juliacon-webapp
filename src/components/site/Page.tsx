import React from "react";
import Head from "next/head";
import { css } from "emotion";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { MainContentContainer } from "./MainContentContainer";

interface PageProps {
  title?: string;
}
export const Page: React.FC<PageProps> = ({ children, title }) => {
  return (
    <div
      className={css`
        min-height: 100vh;
        display: flex;
        flex-flow: column nowrap;
      `}
    >
      <Head>
        <title>{title && `${title} | `}JuliaCon 2020</title>
      </Head>
      <Header />
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
