import * as React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Page } from "../../components/site";
import { SpeakerDetails } from "../../components/speaker";
import {
  getAllSpeakerIds,
  getSpeakerDetails,
  SpeakerDetailsData,
} from "../../data/speaker";

interface SpeakerDetailsPageProps {
  speaker: SpeakerDetailsData;
}

export const SpeakerDetailsPage: NextPage<SpeakerDetailsPageProps> = ({
  speaker,
}) => {
  return (
    <Page>
      <SpeakerDetails speaker={speaker} />
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllSpeakerIds().map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SpeakerDetailsPageProps> = async (
  ctx
) => {
  const id = ctx.params!.id as string;
  const speaker = getSpeakerDetails(id);
  if (!speaker) {
    throw new Error(`failed to get data for speaker: ${id}`);
  }

  const props: SpeakerDetailsPageProps = {
    speaker,
  };

  return { props };
};

export default SpeakerDetailsPage;
