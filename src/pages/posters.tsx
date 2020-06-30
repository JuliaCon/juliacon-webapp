import * as React from "react";
import { NextPage } from "next";
import Error from "next/error";

import { Page } from "../components/site";

/**
 * An overview of all of the poster submissions for the conference.
 *
 * See https://github.com/JuliaCon/juliacon-webapp/issues/2 for details.
 */
const PostersPage: NextPage = () => {
  return (
    <Page>
      <Error statusCode={404} title={"Not implemented"} />
    </Page>
  );
};

export default PostersPage;
