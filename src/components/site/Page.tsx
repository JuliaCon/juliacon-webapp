import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { css } from "emotion";
import { MainContentContainer } from "./MainContentContainer";
import { useRouter } from "next/router";

export const Page: React.FC = ({ children }) => {
  const router = useRouter();
  const route = router.route.substring(1);
  console.log(router);
  return (
    <div
      className={css`
        min-height: 100vh;
        display: flex;
        flex-flow: column nowrap;
      `}
      id={route}
    >
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
