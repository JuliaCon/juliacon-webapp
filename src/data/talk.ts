import { parseISO } from "date-fns";

import talksData from "../../data/talks.json";

import { assertConferenceDay, ConferenceDay } from "../const";
import { pick } from "../utils/pick";
import { getDayString } from "../utils/time";
import { getRoom, getRoomIdFromName, RoomData } from "./room";
import { getSpeaker, SpeakerOverviewData } from "./speaker";
import { getText } from "./utils";
import { getVideoDataForTalk } from "./video";

export const ALL_TALKS = talksData.map((talk) => {
  const roomName = getText(talk.slot.room);
  const roomId = getRoomIdFromName(roomName);
  if (!roomId) {
    throw new Error(
      `failed to load data for room: ${roomName} (for talk: ${talk.code})`
    );
  }

  // Type assertion necessary here because TS gets tripped up
  const speakerIds = (talk.speakers as Array<{ code: string }>).map(
    (s) => s.code
  );

  return {
    id: talk.code,
    title: talk.title,
    abstract: talk.abstract,
    description: talk.description,
    duration: talk.duration,
    startTime: talk.slot.start,
    endTime: talk.slot.end,
    isFeatured: talk.is_featured,
    submissionType: getText(talk.submission_type),
    roomId,
    speakerIds,
  };
});
ALL_TALKS.sort(
  (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
);

export interface TalkOverviewData {
  id: string;
  title: string;
  description: string;
  videoCode: string | null;
  abstract: string;
  day: ConferenceDay;
  isLive: boolean;

  // Note: these both have to be strings (not Dates) since they need to be
  // serialized as JSON (which you can't do with vanilla Dates)
  startTime: string;
  endTime: string;

  room: RoomData;
  speakers: ReadonlyArray<SpeakerOverviewData>;
}

export function getAllTalkIds(): ReadonlyArray<string> {
  return ALL_TALKS.map((t) => t.id);
}

export function getTalkOverview(id: string): TalkOverviewData | null {
  const t = ALL_TALKS.find((t) => t.id === id);
  if (!t) return null;
  return normalizeTalkOverview(t);
}

export function getTalkOverviewX(id: string): TalkOverviewData {
  const talk = getTalkOverview(id);
  if (!talk) {
    throw new Error(`failed to load data for talk: ${id}`);
  }
  return talk;
}

export interface FindTalksCriteria {
  day?: ConferenceDay;
  speakerId?: string;
}
export function findTalks(
  criteria: FindTalksCriteria
): ReadonlyArray<TalkOverviewData> {
  return ALL_TALKS.filter((talk) => {
    if (criteria.day && talkDay(talk) !== criteria.day) {
      return false;
    }
    if (criteria.speakerId && !talk.speakerIds.includes(criteria.speakerId)) {
      return false;
    }
    return true;
  }).map((t) => normalizeTalkOverview(t));
}

export function getTalksForDay(
  day: ConferenceDay
): ReadonlyArray<TalkOverviewData> {
  return findTalks({ day });
}

function normalizeTalkOverview(t: typeof ALL_TALKS[number]): TalkOverviewData {
  const speakers = t.speakerIds.map((s) => {
    const speaker = getSpeaker(s);
    if (!speaker) {
      throw new Error(`failed to load speaker: ${s} (for talk: ${t.id})`);
    }
    return speaker;
  });

  const video = getVideoDataForTalk(t.id);

  const room = getRoom(t.roomId);
  if (!room) {
    throw new Error(`failed to load room: ${t.roomId} (for talk: ${t.id}`);
  }

  return {
    ...pick(t, [
      "id",
      "title",
      "abstract",
      "description",
      "description",
      "startTime",
      "endTime",
    ]),
    day: talkDay(t),
    room,
    speakers,

    videoCode: video?.code || null,
    isLive: video?.isLive || false,
  };
}

function talkDay(t: { startTime: string }): ConferenceDay {
  return assertConferenceDay(getDayString(parseISO(t.startTime)));
}
