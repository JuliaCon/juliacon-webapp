import { PretalxAPISpeaker } from "./PretalxAPISpeaker";
import { LocalizedText } from "./PretalxAPICommon";
import { ConferenceDay } from "../const";
import { filterCriteria } from "../utils/filter";

export interface PretalxAPITalk {
  code: string;
  speakers: readonly PretalxAPISpeaker[];
  title: string;
  submission_type: LocalizedText;
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
}

export function sortTalksByTime(talks: readonly PretalxAPITalk[]) {
  return [...talks].sort((a, b) => {
    return new Date(a.slot.start).getTime() - new Date(b.slot.end).getTime();
  });
}

interface FilterTalksCriteria {
  day?: ConferenceDay | null | "";
  roomName?: string | null;
}
export function filterTalks(
  talks: readonly PretalxAPITalk[],
  criteria: FilterTalksCriteria
) {
  const { day, roomName } = criteria;
  return filterCriteria(talks, [
    day && ((talk) => talk.slot.start.startsWith(day)),
    roomName && ((talk) => talk.slot.room["en"] === roomName),
  ]);
}
