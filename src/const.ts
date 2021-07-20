export const CONFERENCE_DAYS = [
  `2021-07-20`,
  `2021-07-21`,
  `2021-07-22`,
  `2021-07-23`,
  `2021-07-24`,
  `2021-07-25`,
  `2021-07-26`,
  `2021-07-27`,
  `2021-07-28`,
  `2021-07-29`,
  `2021-07-30`,
  `2021-07-31`,
] as const;
export type ConferenceDay = typeof CONFERENCE_DAYS[number];

export function isConferenceDay(x: string): x is ConferenceDay {
  return CONFERENCE_DAYS.includes(x as any);
}

export function assertConferenceDay(x: string): ConferenceDay {
  if (isConferenceDay(x)) return x;
  throw new Error(`Expected ConferenceDay, got ${x}`);
}
