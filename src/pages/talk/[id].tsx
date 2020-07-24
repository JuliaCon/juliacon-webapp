import { NextPage } from "next";
import { withApollo } from "../../apollo";
import { useRouter } from "next/router";
import { TalkDetails } from "../../components/TalkDetails";
import { Page } from "../../components/site";
import React from "react";
import { useTalkDetailsQuery } from "../../components/TalkDetails.generated";

/**
 * The details about a specific talk.
 */
export const TalkPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== "string") {
    throw new Error(`Expected id to be of type string`);
  }

  const { data } = useTalkDetailsQuery({
    variables: { id },
  });
  const talkTitle = data?.talk?.title;
  return (
    <Page title={talkTitle || `Talk Details`}>
      <TalkDetails id={id} />
    </Page>
  );
};

export default withApollo()(TalkPage);
