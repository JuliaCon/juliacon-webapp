import * as React from "react";
import { parseISO, isSameDay, isBefore, isAfter } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";

/**
 * Display a specific time.
 */
export const Time = ({ time }: { time: Date | string }) => {
  const date = typeof time === "string" ? parseISO(time) : time;

  // Compute the date with the timezone added so that we can figure out if the
  // date rolls over (relative to UTC). e.g., 3am utc becomes 8pm pdt (prev day)
  const tz = format(new Date(), "zz");
  const offsetedTime = utcToZonedTime(date, tz);

  function rolloverText() {
    if (!isSameDay(date, offsetedTime) && isBefore(date, offsetedTime)) {
      return " (next day)";
    }
    if (!isSameDay(date, offsetedTime) && isAfter(date, offsetedTime)) {
      return " (prev day)";
    }

    return "";
  }

  return (
    <>
      {format(date, "HH:mm zzz")}
      {rolloverText()}
    </>
  );
};
