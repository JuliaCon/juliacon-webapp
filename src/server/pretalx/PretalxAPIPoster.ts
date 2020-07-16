import postersData from "../../../data/posters.json";
import { pick } from "../../utils/pick";

/**
 * A Poster that is associated with a Poster session.
 */
export type PretalxAPIPoster = typeof ALL_POSTERS[number];

export const ALL_POSTERS = postersData.map((poster) => ({
  ...pick(poster, ["title", "abstract", "description", "speakers"]),
  id: poster.code,
}));
