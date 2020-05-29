import { gql, useQuery } from "@apollo/client";

const TALK_QUERY = gql`
  query Talk($id: ID!) {
    talk(id: $id) {
      id
      title
    }
  }
`;

export interface TalkFragment {
  id: string;
  title: string;
}
export const TalkFragment = gql`
  fragment Talk on Talk {
    id
    title
  }
`;

export interface TalkData {
  talk?: TalkFragment;
}

export function useTalk(id: string) {
  return useQuery<TalkData>(TALK_QUERY, { variables: { id } });
}
