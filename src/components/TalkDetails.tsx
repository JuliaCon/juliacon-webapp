import React from "react";
import { isPast } from "date-fns";
import { css } from "emotion";

import { Center, VSpace } from "./layout";
import { AgendaTalksListItemSpeakers } from "./agenda/AgendaTalksListItem";
import { StyledMarkdown } from "./core";
import { TimeRangeFormatted } from "./date";

import { useTalkDetailsQuery } from "./TalkDetails.generated";

import { TalkYouTubeEmbed } from "./talk";

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
      <h2
        className={css`
          font-size: 2rem;
          font-family: "Patua One", sans-serif;
        `}
      >
        {talk.title}
      </h2>
      <div
        className={css`
          border-top: 0.5rem solid var(--julia-purple);
          width: 6rem;
          margin: 0.5rem 0;
        `}
      />
      <AgendaTalksListItemSpeakers speakers={talk.speakers} />
      <VSpace />
      <TimeRangeFormatted start={talk.startTime} end={talk.endTime} />
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
