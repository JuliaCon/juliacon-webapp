import { NextPage } from "next";
import { withApollo } from "../../apollo";
import { useRouter } from "next/router";
import { TalkDetails } from "../../components/TalkDetails";
import { Page } from "../../components/site";
import React from "react";

/**
 * The details about a specific talk.
 */
export const TalkPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== "string") {
    return <p>"Not Found"</p>;
  }
  return (
    <Page>
      <TalkDetails id={id} />
    </Page>
  );
};

export default withApollo()(TalkPage);
