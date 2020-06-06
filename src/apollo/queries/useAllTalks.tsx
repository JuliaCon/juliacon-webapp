import { gql, useQuery } from "@apollo/client";
import { TalkFragment } from "./useTalk";

const ALL_TALKS_QUERY = gql`
  query AllTalks {
    talks {
      ...Talk
    }
  }

  ${TalkFragment}
`;

interface AllTalksData {
  talks: ReadonlyArray<TalkFragment>;
}

export function useAllTalks() {
  return useQuery(ALL_TALKS_QUERY);
}
