import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Error from "next/error";

import { withApollo } from "../../apollo";
import { Page } from "../../components/site";
import { SpeakerDetails } from "../../components/speaker";

export const SpeakerDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return null;
  }

  if (!id) {
    return <Error statusCode={404} />;
  }

  return (
    <Page>
      <SpeakerDetails id={id} />
    </Page>
  );
};

export default withApollo()(SpeakerDetailsPage);
