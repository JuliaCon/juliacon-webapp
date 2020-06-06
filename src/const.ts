export const CONFERENCE_DAYS = [
  `2019-07-21`,
  `2019-07-22`,
  `2019-07-23`,
  `2019-07-24`,
  `2019-07-25`,
] as const;
export type ConferenceDay = typeof CONFERENCE_DAYS[number];

export function isConferenceDay(x: string): x is ConferenceDay {
  return CONFERENCE_DAYS.includes(x as any);
}

export function assertConferenceDay(x: string): ConferenceDay {
  if (isConferenceDay(x)) return x;
  throw new Error(`Expected ConferenceDay, got ${x}`);
}
