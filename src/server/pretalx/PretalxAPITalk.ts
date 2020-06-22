import { getText } from "./PretalxAPICommon";
import { ConferenceDay } from "../../const";
import { filterCriteria } from "../../utils/filter";
import { isNonNull } from "../../utils/null";

import talksData from "../../../data/talks.json";
import { pick } from "../../utils/pick";
import { nullthrows } from "../../utils/invariant";
import { getRoomIdFromName } from "./PretalxAPIRoom";

export type PretalxAPITalk = typeof ALL_TALKS[number];

export const ALL_TALKS = talksData.map((talk) => ({
  ...pick(talk, ["abstract", "description", "duration", "title"]),
  id: talk.code,
  // Type assertion necessary here because TS gets tripped up
  speakerIds: (talk.speakers as Array<{ code: string }>).map((s) => s.code),
  startTime: talk.slot.start,
  endTime: talk.slot.end,
  roomId: nullthrows(
    getRoomIdFromName(talk.slot.room["en"]),
    `Failed to find matching room for talk`
  ),
  submissionType: getText(talk.submission_type),
  isFeatured: talk.is_featured,
}));
ALL_TALKS.sort(
  (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
);

export function sortTalksByTime(talks: readonly PretalxAPITalk[]) {
  return [...talks].sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.endTime).getTime();
  });
}

interface FilterTalksCriteria {
  day?: ConferenceDay | null | "";
  roomId?: string | null;
  submissionType?: string | null;
}
export function filterTalks(
  talks: readonly PretalxAPITalk[],
  criteria: FilterTalksCriteria
) {
  const { day, roomId, submissionType } = criteria;
  return filterCriteria(talks, [
    day && ((talk) => talk.startTime.startsWith(day)),
    roomId && ((talk) => talk.roomId === roomId),
    isNonNull(submissionType) &&
      ((talk) => talk.submissionType === submissionType),
  ]);
}
