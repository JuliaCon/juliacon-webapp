import * as React from "react";
import { NextPage } from "next";

import { ComingSoon } from "../components/ComingSoon";
import { Page } from "../components/site";

/**
 * The "live overview" page for the app.
 *
 * This is the main view for the app during the conference. It's where users
 * land when the log on.
 *
 * See https://github.com/JuliaCon/juliacon-webapp/issues/3 for details.
 */
const LivePage: NextPage = () => {
  return (
    <Page>
      <ComingSoon />
    </Page>
  );
};

export default LivePage;
