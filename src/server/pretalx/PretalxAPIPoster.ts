import postersData from "../../../data/posters.json";
import { pick } from "../../utils/pick";

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


