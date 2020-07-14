import * as React from "react";
import { useContext } from "react";
import { parseISO, format, isSameDay, isBefore, isAfter } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { TimezoneContext } from "../../const";

/**
 * Display a specific time.
 *
 * In the future, we might consider adding support for timezones (though that
 * gets complicated since talks on (e.g.) July 27 might roll over July 28 for
 * some timezones (though I don't think this is actually an issue for JuliaCon
 * since we're targeting PST to IST and everything fits within those timezones
 * in the same day).
 */
export const Time = ({ time }: { time: Date | string }) => {
  const date = typeof time === "string" ? parseISO(time) : time;
  const timezoneContext = useContext(TimezoneContext);
  const offsetedTime = utcToZonedTime(date, timezoneContext.timezone);

  function rolloverText() {
    if (!isSameDay(date, offsetedTime) && isBefore(date, offsetedTime)) {
      return "The next day";
    }
    if (!isSameDay(date, offsetedTime) && isAfter(date, offsetedTime)) {
      return "The previous day";
    }

    return "";
  }

  return (
    <>
      {format(offsetedTime, "HH:mm")} <br />
      UTC{timezoneContext.timezone}
      <br />
      {rolloverText()}
    </>
  );
};
