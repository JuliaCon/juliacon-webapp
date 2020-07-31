import * as React from "react";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";

/**
 * Display a specific time.
 */
export const DateTime = ({ time }: { time: Date | string }) => {
  const date = typeof time === "string" ? parseISO(time) : time;

  return <>{format(date, "yyyy-MM-dd HH:mm zzz")}</>;
};
