import React from "react";
import { NextPage } from "next";

import { withApollo } from "../apollo";
import { Page } from "../components/site";
import { TalkOverview } from "../components/talk";

const Agenda: NextPage = () => {
  return (
    <Page>
      <TalkOverview id={"B38TDU"} />
    </Page>
  );
};

export default withApollo()(Agenda);
