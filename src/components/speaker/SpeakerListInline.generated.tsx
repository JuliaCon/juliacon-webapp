import * as Types from "../../apollo/__generated__/types";

import gql from "graphql-tag";

export type SpeakerListInlineFragment = {
  readonly __typename?: "Speaker";
} & Pick<Types.Speaker, "id" | "name">;

export const SpeakerListInlineFragmentDoc = gql`
  fragment SpeakerListInline on Speaker {
    id
    name
  }
`;
