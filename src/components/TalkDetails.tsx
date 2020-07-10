import React from "react";
import { VSpace } from "./layout";
import { AgendaTalksListItemSpeakers } from "./agenda/AgendaTalksListItem";
import { css } from "emotion";
import { StyledMarkdown } from "./core";
import { TimeRangeFormatted } from "./date";

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

  return (
    <div>
      <h2
        className={css`
          font-weight: bold;
          font-size: 2rem;
          padding-bottom: 10px;
        `}
      >
        {talk.title}
      </h2>
      <AgendaTalksListItemSpeakers speakers={talk.speakers} />
      <VSpace />
      <TimeRangeFormatted start={talk.startTime} end={talk.endTime} />
      <VSpace />
      {talk.abstract && (
        <div>
          <h4
            className={css`
              font-weight: bold;
              font-size: 1rem;
              padding-bottom: 10px;
            `}
          >
            Abstract:
          </h4>
          <StyledMarkdown source={talk.abstract} />
        </div>
      )}
      <VSpace />
      {talk.description && (
        <div>
          <h4
            className={css`
              font-weight: bold;
              font-size: 1rem;
              padding-bottom: 10px;
            `}
          >
            Description:
          </h4>
          <StyledMarkdown source={talk.description} />
        </div>
      )}
      <VSpace />
    </div>
  );
};
