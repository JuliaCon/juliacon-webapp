import speakersData from "../../data/speakers.json";
import { pick } from "../utils/pick";

/**
 * A Speaker that is associated with a Talk.
 */
export type PretalxAPISpeaker = typeof ALL_SPEAKERS[number];

export const ALL_SPEAKERS = speakersData.map((speaker) => ({
  ...pick(speaker, ["name", "biography", "avatar"]),
  id: speaker.code,
}));
