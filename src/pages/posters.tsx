import * as React from "react";
import { NextPage } from "next";

import { ComingSoon } from "../components/ComingSoon";
import { Page } from "../components/site";

/**
 * An overview of all of the poster submissions for the conference.
 *
 * See https://github.com/JuliaCon/juliacon-webapp/issues/2 for details.
 */
const PostersPage: NextPage = () => {
  return (
    <Page>
      <ComingSoon />
    </Page>
  );
};

export default PostersPage;
