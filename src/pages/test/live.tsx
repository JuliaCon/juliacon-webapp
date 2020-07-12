import { NextPage } from "next";
import { Page } from "../../components/site";
import { LiveTalksView } from "../../components/live/LiveTalksOverview";
import React from "react";

const TestLivePage: NextPage = () => {
  return (
    <Page>
      <LiveTalksView />
    </Page>
  );
};

export default TestLivePage;
