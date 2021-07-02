import React from "react";
import { isPast, parseISO } from "date-fns";
import { css } from "emotion";
import { TalkOverviewData } from "../data/talk";

import { StyledMarkdown } from "./core";
import { Center, VSpace } from "./layout";
import { PageHeading } from "./page";
import { TalkByline, TalkYouTubeEmbed } from "./talk";

export const TalkDetails = ({ talk }: { talk: TalkOverviewData }) => {
  const startTime = parseISO(talk.startTime);
  const video = talk.videoCode && isPast(startTime) && (
    <>
      <VSpace />
      <Center>
        <TalkYouTubeEmbed talk={talk} />
      </Center>
    </>
  );

  return (
    <div>
      <PageHeading>{talk.title}</PageHeading>
      <VSpace />
      <TalkByline vertical talk={talk} />
      {video}
      <VSpace />
      {talk.abstract && (
        <div>
          <h4
            className={css`
              font-weight: bold;
              font-size: 1rem;
            `}
          >
            Abstract:
          </h4>
          <div
            className={css`
              padding-left: 1rem;
            `}
          >
            <StyledMarkdown source={talk.abstract} />
          </div>
        </div>
      )}
      <VSpace />
      {talk.description && (
        <div>
          <h4
            className={css`
              font-weight: bold;
              font-size: 1rem;
            `}
          >
            Description:
          </h4>
          <div
            className={css`
              padding-left: 1rem;
            `}
          >
            <StyledMarkdown source={talk.description} />
          </div>
        </div>
      )}
      <VSpace />
    </div>
  );
};
