export const CONFERENCE_DAYS = [
  `2022-07-19`,
  `2022-07-20`,
  `2022-07-21`,
  `2022-07-22`,
  `2022-07-23`,
  `2022-07-24`,
  `2022-07-25`,
  `2022-07-26`,
  `2022-07-27`,
  `2022-07-28`,
  `2022-07-29`,
  `2022-07-30`,
] as const;
export type ConferenceDay = typeof CONFERENCE_DAYS[number];

export function isConferenceDay(x: string): x is ConferenceDay {
  return CONFERENCE_DAYS.includes(x as any);
}

export function assertConferenceDay(x: string): ConferenceDay {
  if (isConferenceDay(x)) return x;
  throw new Error(`Expected ConferenceDay, got ${x}`);
}
