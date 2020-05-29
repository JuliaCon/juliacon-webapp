import { NextPage } from "next";
import { withApollo } from "../../apollo";
import { useRouter } from "next/router";
import { TalkDetails } from "../../components/TalkDetails";
import React from "react";

export const TalkPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log({ id });
  if (typeof id !== "string") {
    return <p>"Not Found"</p>;
  }
  return <TalkDetails id={id} />;
};

export default withApollo()(TalkPage);
