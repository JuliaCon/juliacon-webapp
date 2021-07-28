import { addHours, parseISO } from "date-fns";

import talksData from "../../data/talks.json";
import minisymposiaData from "../../data/minisymposia.json";

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
    // HACK
    endTime:
      talk.slot.end || addHours(parseISO(talk.slot.start), 1).toISOString(),
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
  type: string;
  title: string;
  description?: string;
  videoCode: string | null;
  abstract: string;
  day: ConferenceDay;
  isLive: boolean;

  minisymposium?: MinisymposiumData;

  // Note: these both have to be strings (not Dates) since they need to be
  // serialized as JSON (which you can't do with vanilla Dates)
  startTime: string;
  endTime: string;

  room: RoomData;
  speakers: ReadonlyArray<SpeakerOverviewData>;

  nextTalk: null | {
    id: string;
    title: string;
  };
}

export interface MinisymposiumData {
  talks: ReadonlyArray<{
    title: string;
    videoCode: string;
  }>;
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
  criteria: FindTalksCriteria,
  opts?: TalkOptions
): ReadonlyArray<TalkOverviewData> {
  return ALL_TALKS.filter((talk) => {
    if (criteria.day && talkDay(talk) !== criteria.day) {
      return false;
    }
    if (criteria.speakerId && !talk.speakerIds.includes(criteria.speakerId)) {
      return false;
    }
    return true;
  }).map((t) => normalizeTalkOverview(t, opts));
}

export function getTalksForDay(
  day: ConferenceDay
): ReadonlyArray<TalkOverviewData> {
  return findTalks({ day });
}

export interface TalkOptions {
  includeDescription?: boolean;
}

function normalizeTalkOverview(
  t: typeof ALL_TALKS[number],
  { includeDescription = true }: TalkOptions = {}
): TalkOverviewData {
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

  const nextTalk = ALL_TALKS.find(
    (other) => other.roomId === t.roomId && other.startTime === t.endTime
  );

  const talk: TalkOverviewData = {
    ...pick(t, ["id", "title", "abstract", "startTime", "endTime"]),
    type: t.submissionType,
    day: talkDay(t),
    room,
    speakers,

    videoCode: video?.code || null,
    isLive: video?.isLive || false,

    nextTalk: nextTalk
      ? {
          id: nextTalk.id,
          title: nextTalk.title,
        }
      : null,
  };

  if (includeDescription) {
    talk.description = t.description;
  }

  // Special case: add minisymposium data if the talk is one
  const minisymposium = minisymposiaData.find((d) => d.id === t.id);
  if (minisymposium) {
    talk.minisymposium = {
      talks: minisymposium.videos.map((t) => ({
        title: t.title,
        videoCode: t.videoCode,
      })),
    };

    // HACK:
    // The live view only includes the abstracts (to save bandwidth), but for
    // the minisymposium, we REALLY want to include the description since it
    // contains details about all the individual talks.
    if (!includeDescription) {
      talk.abstract = t.description;
    }
  }

  return talk;
}

function talkDay(t: { startTime: string }): ConferenceDay {
  return assertConferenceDay(getDayString(parseISO(t.startTime)));
}
