import { NextPage } from "next";
import { Page } from "../components/site";
import { LiveTalksView } from "../components/live";
import React from "react";
import { withApollo } from "../apollo";
import { PageHeading } from "../components/page";
import { VSpace } from "../components/layout";

const TestLivePage: NextPage = () => {
  return (
    <Page title={"Live Overview"}>
      <PageHeading>Live Overview</PageHeading>
      <VSpace />
      <LiveTalksView />
    </Page>
  );
};

export default withApollo()(TestLivePage);
