import * as Types from "../../apollo/__generated__/types";

import { SpeakerListInlineFragment } from "../speaker/SpeakerListInline.generated";
import gql from "graphql-tag";
import { SpeakerListInlineFragmentDoc } from "../speaker/SpeakerListInline.generated";

export type TalkBylineFragment = { readonly __typename?: "Talk" } & Pick<
  Types.Talk,
  "startTime" | "endTime"
> & {
    readonly speakers: ReadonlyArray<
      { readonly __typename?: "Speaker" } & SpeakerListInlineFragment
    >;
    readonly room: { readonly __typename?: "Room" } & Pick<
      Types.Room,
      "id" | "color" | "name"
    >;
  };

export const TalkBylineFragmentDoc = gql`
  fragment TalkByline on Talk {
    startTime
    endTime
    speakers {
      ...SpeakerListInline
    }
    room {
      id
      color
      name
    }
  }
  ${SpeakerListInlineFragmentDoc}
`;
