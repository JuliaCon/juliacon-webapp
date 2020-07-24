import * as React from "react";
import { NextPage } from "next";

import { Page } from "../components/site";
import { PosterList } from "../components/poster";
import { withApollo } from "../apollo";

/**
 * An overview of all of the poster submissions for the conference.
 *
 * See https://github.com/JuliaCon/juliacon-webapp/issues/2 for details.
 */
const PostersPage: NextPage = () => {
  return (
    <Page title={"Posters"}>
      (The links on this page are not yet ready, as the posters are
      still being uploaded. Please check back soon to see the posters!)
      <PosterList />
    </Page>
  );
};

export default withApollo()(PostersPage);
