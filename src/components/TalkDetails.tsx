import { gql, useQuery } from "@apollo/client";
import React from "react";

export const TalkDetailsFragment = gql`
  fragment TalkDetails on Talk {
    id
    title
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
      <pre>{JSON.stringify(data, null, 1)}</pre>
    </div>
  );
};
