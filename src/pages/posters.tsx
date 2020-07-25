import * as React from "react";
import { NextPage } from "next";

import { Page } from "../components/site";
import { PosterList } from "../components/poster";
import { withApollo } from "../apollo";
import { PageHeading } from "../components/page";
import { VSpace } from "../components/layout";
import { css } from "emotion";

/**
 * An overview of all of the poster submissions for the conference.
 *
 * See https://github.com/JuliaCon/juliacon-webapp/issues/2 for details.
 */
const PostersPage: NextPage = () => {
  return (
    <Page title={"Posters"}>
      <PageHeading>Posters</PageHeading>
      <VSpace />
      <div
        className={css`
          max-width: 400px;
          padding: 0 1rem;
          border-left: 0.5rem solid hsl(4, 60%, 50%);
          color: hsl(4, 60%, 20%);
        `}
      >
        <p>
          The links on this page are not yet ready, as the posters are still
          being uploaded. Please check back soon to see the posters!
        </p>
      </div>
      <VSpace />
      <PosterList />
    </Page>
  );
};

export default withApollo()(PostersPage);
