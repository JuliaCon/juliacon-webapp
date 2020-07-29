import * as React from "react";
import { NextPage } from "next";

import { Page } from "../components/site";
import { PosterList } from "../components/poster";
import { withApollo } from "../apollo";
import { PageHeading } from "../components/page";
import { VSpace } from "../components/layout";

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
      <PosterList />
    </Page>
  );
};

export default withApollo()(PostersPage);
