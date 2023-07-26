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
  const fullTitle = `${title ? `${title} | ` : ""}JuliaCon 2023`;
  return (
    <div
      className={css`
        min-height: 100vh;
        display: flex;
        flex-flow: column nowrap;
      `}
    >
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={fullTitle} key="ogtitle" />
        <meta
          property="og:description"
          content={metaDescription}
          key="ogdesc"
        />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content={twitterHandle} key="twhandle" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta
          property="og:site_name"
          content="JuliaCon 2023"
          key="ogsitename"
        />
      </Head>
      <Header />
      <MainContentContainer hideSponsorSidebar={hideSponsorSidebar}>
        {children}
      </MainContentContainer>
    </div>
  );
};

const twitterHandle = "JuliaConOrg";
const metaDescription =
  `JuliaCon 2023` +
  `Join us to learn about the cool and exciting things happening within the Julia & JuMP ecosystems!`;
const previewImage = "https://juliacon.org/assets/2023/img/boston_2800.png";
