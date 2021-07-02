import speakersData from "../../data/speakers.json";
import { pick } from "../utils/pick";
import { findTalks, TalkOverviewData } from "./talk";

export interface SpeakerOverviewData {
  id: string;
  name: string;
}

export interface SpeakerDetailsData {
  id: string;
  name: string;
  avatar: string | null;
  biography: string | null;
  talks: ReadonlyArray<TalkOverviewData>;
}

const ALL_SPEAKERS = speakersData.map((speaker) => ({
  ...pick(speaker, ["name", "biography", "avatar"]),
  id: speaker.code,
}));

export function getSpeaker(id: string): SpeakerOverviewData | null {
  const speaker = ALL_SPEAKERS.find((s) => s.id === id) || null;
  if (!speaker) return null;

  // Return a pared-down version of the speaker data
  // We do this because these values ultimately get serialized to JSON and sent
  // as HTML so we want to reduce the size of this payload in circumstances when
  // we don't need lots of additional data (without this optimization, loading
  // the agenda would also load the bio for every single presenter for that day,
  // which adds up to a few 100 kb).
  return {
    id: speaker.id,
    name: speaker.name,
  };
}

export function getSpeakerDetails(id: string): SpeakerDetailsData | null {
  const speaker = ALL_SPEAKERS.find((s) => s.id === id) || null;
  if (!speaker) return null;
  return {
    ...speaker,
    talks: findTalks({ speakerId: id }),
  };
}

export function getAllSpeakerIds(): ReadonlyArray<string> {
  return ALL_SPEAKERS.map((s) => s.id);
}
