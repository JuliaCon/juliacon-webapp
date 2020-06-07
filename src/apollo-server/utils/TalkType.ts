import { TalkType } from "../resolvers/__types__";
import { nullthrows } from "../../utils/invariant";

export { TalkType };

/**
 * We want to map with Pretalx's submission type to our own GraphQL TalkType
 * enum.
 */
const mapping: Record<string, TalkType> = {
  "Birds of Feather": TalkType.BirdsOfFeather,
  "Break": TalkType.Break,
  "Keynote": TalkType.Keynote,
  "Lightning Talk": TalkType.LightningTalk,
  "Minisymposia / Extended Presentation": TalkType.Minisymposium,
  "Sponsor's Address": TalkType.SponsorAddress,
  "Talk": TalkType.Talk,
  "Workshop (full day)": TalkType.WorkshopFullDay,
  "Workshop (half day)": TalkType.WorkshopHalfDay,
};

const reverseMapping = Object.fromEntries(
  Object.entries(mapping).map(
    ([submissionType, talkType]) => [talkType, submissionType] as const
  )
) as Record<TalkType, string>;

export function talkTypeToSubmissionType(talkType: TalkType) {
  return nullthrows(reverseMapping[talkType], `Unknown talk type: ${talkType}`);
}

export function submissionTypeToTalkType(submissionType: string) {
  return nullthrows(
    mapping[submissionType],
    `Unknown submission type: ${submissionType}`
  );
}
