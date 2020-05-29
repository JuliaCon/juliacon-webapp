import React from "react";
import { Page } from "../components/layout/Page";
import { Talks } from "../components/Talk";
import { withApollo } from "../apollo/withApollo";
import { NextPage } from "next";

const Schedule: NextPage = () => {
  return (
    <Page>
      <p>Schedule</p>
      <Talks />
    </Page>
  );
};

export default withApollo()(Schedule);
