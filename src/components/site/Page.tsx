import React from "react";
import Head from "next/head";
import { css } from "emotion";

import { Header } from "./Header";
import { MainContentContainer } from "./MainContentContainer";

interface PageProps {
  title?: string;
  hideSponsorSidebar?: boolean;
}
export const Page: React.FC<PageProps> = ({
  children,
  title,
  hideSponsorSidebar,
}) => {
  return (
    <div
      className={css`
        min-height: 100vh;
        display: flex;
        flex-flow: column nowrap;
      `}
    >
      <Head>
        <title>{title && `${title} | `}JuliaCon 2021</title>
      </Head>
      <Header />
      <MainContentContainer hideSponsorSidebar={hideSponsorSidebar}>
        {children}
      </MainContentContainer>
    </div>
  );
};
