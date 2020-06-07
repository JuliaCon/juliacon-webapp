import { PretalxAPISpeaker } from "./PretalxAPISpeaker";
import { getText, LocalizedText } from "./PretalxAPICommon";
import { ConferenceDay } from "../const";
import { filterCriteria } from "../utils/filter";
import { isNonNull } from "../utils/null";

export interface PretalxAPITalk {
  code: string;
  speakers: readonly PretalxAPISpeaker[];
  title: string;
  track?: string | null;
  state?: "accepted" | "confirmed" | "rejected" | "submitted";
  abstract: string;
  description: string;
  duration?: string;
  do_not_record?: boolean;
  is_featured?: boolean;
  content_locale?: string;
  slot: {
    room: LocalizedText;
    start: string;
    end: string;
  };
  slot_count?: number;

  // For some reason, the Pretalx API returns a plain string only for the
  // "Talk" submisison type.
  submission_type: LocalizedText | string;
}

export function sortTalksByTime(talks: readonly PretalxAPITalk[]) {
  return [...talks].sort((a, b) => {
    return new Date(a.slot.start).getTime() - new Date(b.slot.end).getTime();
  });
}

interface FilterTalksCriteria {
  day?: ConferenceDay | null | "";
  roomName?: string | null;
  submissionType?: string | null;
}
export function filterTalks(
  talks: readonly PretalxAPITalk[],
  criteria: FilterTalksCriteria
) {
  const { day, roomName, submissionType } = criteria;
  return filterCriteria(talks, [
    day && ((talk) => talk.slot.start.startsWith(day)),
    roomName && ((talk) => talk.slot.room["en"] === roomName),
    isNonNull(submissionType) &&
      ((talk) => getText(talk.submission_type) === submissionType),
  ]);
}
