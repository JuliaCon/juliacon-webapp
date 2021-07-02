export const CONFERENCE_DAYS = [
  `2020-07-24`,
  `2020-07-25`,
  `2020-07-26`,
  `2020-07-27`,
  `2020-07-28`,
  `2020-07-29`,
  `2020-07-30`,
  `2020-07-31`,
] as const;
export type ConferenceDay = typeof CONFERENCE_DAYS[number];

export function isConferenceDay(x: string): x is ConferenceDay {
  return CONFERENCE_DAYS.includes(x as any);
}

export function assertConferenceDay(x: string): ConferenceDay {
  if (isConferenceDay(x)) return x;
  throw new Error(`Expected ConferenceDay, got ${x}`);
}
