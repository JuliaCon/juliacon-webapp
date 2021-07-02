import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { TalkDetails } from "../../components/TalkDetails";
import { Page } from "../../components/site";

import React from "react";
import { getAllTalkIds, getTalkOverviewX } from "../../data/talk";
import { TalkOverviewData } from "../../data/talk";

interface TalkPageProps {
  talk: TalkOverviewData;
}

/**
 * The details about a specific talk.
 */
export const TalkPage: NextPage<TalkPageProps> = ({ talk }) => {
  return (
    <Page title={talk.title}>
      <TalkDetails talk={talk} />
    </Page>
  );
};

export default TalkPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllTalkIds().map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TalkPageProps> = async ({
  params,
}) => {
  const props: TalkPageProps = {
    talk: getTalkOverviewX(params!.id as string),
  };
  return { props };
};
