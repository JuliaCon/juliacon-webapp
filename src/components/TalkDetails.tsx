import React from "react";
import { VSpace } from "./layout";
import { AgendaTalksListItemSpeakers } from "./agenda/AgendaTalksListItem";
import { css } from "emotion";

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
      <p
        className={css`
          font-weight: bold;
        `}
      >
        {talk.abstract}
      </p>
      <VSpace />
      <p>{talk.description}</p>
      <VSpace />
    </div>
  );
};
