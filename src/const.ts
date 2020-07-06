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

export const DISCORD_COOKIE = "discord";

export const timezoneOptions = [
  { value: -720, label: "UTC-12:00" },
  { value: -660, label: "UTC-11:00" },
  { value: -600, label: "UTC-10:00" },
  { value: -570, label: "UTC-09:30" },
  { value: -540, label: "UTC-09:00" },
  { value: -480, label: "UTC-08:00" },
  { value: -420, label: "UTC-07:00" },
  { value: -360, label: "UTC-06:00" },
  { value: -300, label: "UTC-05:00" },
  { value: -240, label: "UTC-04:00" },
  { value: -210, label: "UTC-03:30" },
  { value: -180, label: "UTC-03:00" },
  { value: -120, label: "UTC-02:00" },
  { value: -60, label: "UTC-01:00" },
  { value: 0, label: "UTC+00:00" },
  { value: 60, label: "UTC+01:00" },
  { value: 120, label: "UTC+02:00" },
  { value: 180, label: "UTC+03:00" },
  { value: 210, label: "UTC+03:30" },
  { value: 240, label: "UTC+04:00" },
  { value: 270, label: "UTC+04:30" },
  { value: 300, label: "UTC+05:00" },
  { value: 330, label: "UTC+05:30" },
  { value: 345, label: "UTC+05:45" },
  { value: 360, label: "UTC+06:00" },
  { value: 390, label: "UTC+06:30" },
  { value: 420, label: "UTC+07:00" },
  { value: 480, label: "UTC+08:00" },
  { value: 525, label: "UTC+08:45" },
  { value: 540, label: "UTC+09:00" },
  { value: 570, label: "UTC+09:30" },
  { value: 600, label: "UTC+10:00" },
  { value: 630, label: "UTC+10:30" },
  { value: 660, label: "UTC+11:00" },
  { value: 720, label: "UTC+12:00" },
  { value: 765, label: "UTC+12:45" },
  { value: 780, label: "UTC+13:00" },
  { value: 840, label: "UTC+14:00" },
];
