import { gql, useQuery } from "@apollo/client";
import React from "react";
import { VSpace } from "./layout";
import { AgendaTalksListItemSpeakers } from "./agenda/AgendaTalksListItem";
import { css } from "emotion";

export const TalkDetailsFragment = gql`
  fragment TalkDetails on Talk {
    id
    title
    abstract
    description
    speakers {
      id
      name
    }
  }
`;
export const TalkDetailsQuery = gql`
  query TalkDetails($id: ID!) {
    talk(id: $id) {
      ...TalkDetails
    }
  }

  ${TalkDetailsFragment}
`;

export const TalkDetails: React.FC<{ id: string }> = ({ id }) => {
  const { data, loading, error } = useQuery(TalkDetailsQuery, {
    variables: { id },
  });
  if (error) throw error;
  if (loading) return <p>"Loading"</p>;
  if (!data) throw new Error(`Failed to load data`);
  const talk = data.talk;
  if (!talk) return <p>"Not Found"</p>;

  console.log(data);

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
