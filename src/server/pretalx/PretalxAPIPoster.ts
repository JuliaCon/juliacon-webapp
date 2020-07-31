import { pick } from "../../utils/pick";

import postersData from "../../../data/posters.json";
import sessionData from "../../../data/postersessions.json";
import { nullthrows } from "../../utils/invariant";

/**
 * A Poster that is associated with a Poster session.
 */
export type PretalxAPIPoster = typeof ALL_POSTERS[number];

/**
 * Pull poster data from json file.
 * SpeakerIds grabbed here for each poster
 */
export const ALL_POSTERS = postersData.map((poster) => ({
  ...pick(poster, ["title", "abstract", "description"]),
  id: poster.code,
  speakerIds: (poster.speakers as Array<{ code: string }>).map((s) => s.code),
}));

const sessionOne = nullthrows(sessionData.find((s) => s.code === "9BNNMD"));
const sessionTwo = nullthrows(sessionData.find((s) => s.code === "LRRAGD"));
export function getPosterSession(posterId: string) {
  if (sessionOne.posters.includes(posterId)) return "one";
  if (sessionTwo.posters.includes(posterId)) return "two";
  throw new Error(`Unknown poster: ${posterId}`);
}
