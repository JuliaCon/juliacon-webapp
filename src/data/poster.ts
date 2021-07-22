/* eslint-disable */

import POSTERS from "../../data/posters.json";
import POSTER_SESSIONS from "../../data/postersessions.json";

import type { SpeakerOverviewData } from "./speaker";

type PosterRawData = typeof POSTERS[number];

export type PosterSession = "1" | "2";

export interface PosterData {
  id: string;
  title: string;
  abstract: string;
  description: string;
  session: PosterSession;
  pdflink: string;
  speakers: ReadonlyArray<SpeakerOverviewData>;
}

export interface PosterFilterCriteria {
  session?: "1" | "2";
}
export function getPosters({
  session,
}: PosterFilterCriteria = {}): ReadonlyArray<PosterData> {
  // TODO:
  //    There are currently no posted posters. Update this once we have posters.
  return [];

  // type FilterFn = (p: PosterRawData) => boolean;
  // let filters: FilterFn[] = [];
  // if (session) {
  //   filters.push((p) => getPosterSession(p.code) === session);
  // }
  // return POSTERS.filter((p) => filters.every((filter) => filter(p))).map(
  //   (p): PosterData => {
  //     // TypeScript gets a bit confused in the type inference for the speakers
  //     // field here, so we have to help it a bit
  //     interface RawSpeakerData {
  //       code: string;
  //       name: string;
  //     }
  //     const speakers = (p.speakers as RawSpeakerData[]).map(
  //       (s): SpeakerOverviewData => ({ id: s.code, name: s.name })
  //     );
  //
  //     return {
  //       id: p.code,
  //       title: p.title,
  //       abstract: p.abstract,
  //       description: p.description,
  //       session: getPosterSession(p.code),
  //       pdflink: `/uploads/posters/${p.code}.pdf`,
  //       speakers,
  //     };
  //   }
  // );
}

const SESSION_ONE = POSTER_SESSIONS.find((s) => s.code === "9BNNMD")!;
const SESSION_TWO = POSTER_SESSIONS.find((s) => s.code === "LRRAGD")!;

function getPosterSession(posterId: string): PosterSession {
  if (SESSION_ONE.posters.includes(posterId)) {
    return "1";
  } else if (SESSION_TWO.posters.includes(posterId)) {
    return "2";
  } else {
    throw new Error(`unable to lookup poster session for poster: ${posterId}`);
  }
}
