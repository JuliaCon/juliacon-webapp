import React from "react";
import { isPast } from "date-fns";
import { css } from "emotion";

import { StyledMarkdown } from "./core";
import { Center, VSpace } from "./layout";
import { PageHeading } from "./page";
import { TalkByline, TalkYouTubeEmbed } from "./talk";

import { useTalkDetailsQuery } from "./TalkDetails.generated";

export const TalkDetails: React.FC<{ id: string }> = ({ id }) => {
  const { data, error, loading } = useTalkDetailsQuery({
    variables: { id: id },
  });

  if (error) throw error;
  if (loading) return <p>"Loading"</p>;
  if (!data) throw new Error(`Failed to load data`);
  const talk = data.talk;
  if (!talk) return <p>"Not Found"</p>;

  const startTime = new Date(talk.startTime);
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
