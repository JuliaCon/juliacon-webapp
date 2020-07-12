import React from "react";
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

export const TimezoneContext = React.createContext({
  timezone: "+00:00",
  changeTimezone: (timezone: string) => {},
});

export const timezoneOptions = [
  {
    label: "UTC-12:00",
    value: "-12:00",
  },
  {
    label: "UTC-11:00",
    value: "-11:00",
  },
  {
    label: "UTC-10:00",
    value: "-10:00",
  },
  {
    label: "UTC-09:30",
    value: "-09:30",
  },
  {
    label: "UTC-09:00",
    value: "-09:00",
  },
  {
    label: "UTC-08:00",
    value: "-08:00",
  },
  {
    label: "UTC-07:00",
    value: "-07:00",
  },
  {
    label: "UTC-06:00",
    value: "-06:00",
  },
  {
    label: "UTC-05:00",
    value: "-05:00",
  },
  {
    label: "UTC-04:00",
    value: "-04:00",
  },
  {
    label: "UTC-03:30",
    value: "-03:30",
  },
  {
    label: "UTC-03:00",
    value: "-03:00",
  },
  {
    label: "UTC-02:00",
    value: "-02:00",
  },
  {
    label: "UTC-01:00",
    value: "-01:00",
  },
  {
    label: "UTC+00:00",
    value: "+00:00",
  },
  {
    label: "UTC+01:00",
    value: "+01:00",
  },
  {
    label: "UTC+02:00",
    value: "+02:00",
  },
  {
    label: "UTC+03:00",
    value: "+03:00",
  },
  {
    label: "UTC+03:30",
    value: "+03:30",
  },
  {
    label: "UTC+04:00",
    value: "+04:00",
  },
  {
    label: "UTC+04:30",
    value: "+04:30",
  },
  {
    label: "UTC+05:00",
    value: "+05:00",
  },
  {
    label: "UTC+05:30",
    value: "+05:30",
  },
  {
    label: "UTC+05:45",
    value: "+05:45",
  },
  {
    label: "UTC+06:00",
    value: "+06:00",
  },
  {
    label: "UTC+06:30",
    value: "+06:30",
  },
  {
    label: "UTC+07:00",
    value: "+07:00",
  },
  {
    label: "UTC+08:00",
    value: "+08:00",
  },
  {
    label: "UTC+08:45",
    value: "+08:45",
  },
  {
    label: "UTC+09:00",
    value: "+09:00",
  },
  {
    label: "UTC+09:30",
    value: "+09:30",
  },
  {
    label: "UTC+10:00",
    value: "+10:00",
  },
  {
    label: "UTC+10:30",
    value: "+10:30",
  },
  {
    label: "UTC+11:00",
    value: "+11:00",
  },
  {
    label: "UTC+12:00",
    value: "+12:00",
  },
  {
    label: "UTC+12:45",
    value: "+12:45",
  },
  {
    label: "UTC+13:00",
    value: "+13:00",
  },
  {
    label: "UTC+14:00",
    value: "+14:00",
  },
];
