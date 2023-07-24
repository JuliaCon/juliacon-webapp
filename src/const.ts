export const CONFERENCE_DAYS = [
  `2023-07-25`,
  `2023-07-26`,
  `2023-07-27`,
  `2023-07-28`,
  `2023-07-29`,
] as const;
export type ConferenceDay = typeof CONFERENCE_DAYS[number];

export function isConferenceDay(x: string): x is ConferenceDay {
  return CONFERENCE_DAYS.includes(x as any);
}

export function assertConferenceDay(x: string): ConferenceDay {
  if (isConferenceDay(x)) return x;
  throw new Error(`Expected ConferenceDay, got ${x}`);
}
