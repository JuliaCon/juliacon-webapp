import React from "react";
import { NextPage } from "next";

import { withApollo } from "../apollo";
import { Page } from "../components/site";

const Schedule: NextPage = () => {
  return (
    <Page>
      <p>Schedule</p>
    </Page>
  );
};

export default withApollo()(Schedule);
