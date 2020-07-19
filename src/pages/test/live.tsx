import { NextPage } from "next";
import { Page } from "../../components/site";
import { LiveTalksView } from "../../components/live";
import React from "react";
import { withApollo } from "../../apollo";

const TestLivePage: NextPage = () => {
  return (
    <Page>
      <LiveTalksView />
    </Page>
  );
};

export default withApollo()(TestLivePage);
