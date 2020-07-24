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
