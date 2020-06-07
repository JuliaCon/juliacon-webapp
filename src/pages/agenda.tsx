import React from "react";
import { NextPage } from "next";

import { withApollo } from "../apollo";
import { Page } from "../components/site";

const Agenda: NextPage = () => {
  return <Page></Page>;
};

export default withApollo()(Agenda);
