import { gql, useQuery } from "@apollo/client";
import React from "react";
import Markdown from "react-markdown";

export const TalkDetailsFragment = gql`
  fragment TalkDetails on Talk {
    id
    title
    abstract
    description
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

  return (
    <div>
      <h1>{talk.title}</h1>
      <p>{talk.abstract}</p>
      <Markdown source={talk.description} />
    </div>
  );
};
