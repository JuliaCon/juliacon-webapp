import React from "react";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";

export interface TimeRangeFormattedProps {
  start: Date | string;
  end: Date | string;
  collapseDay?: boolean;
}
export const TimeRangeFormatted: React.FC<TimeRangeFormattedProps> = ({
  start,
  end,
  collapseDay = false,
}) => {
  start = typeof start === "string" ? parseISO(start) : start;
  end = typeof end === "string" ? parseISO(end) : end;

  if (collapseDay) {
    return (
      <span>
        {formatTimeOnly(start)} &mdash; {formatTimeOnly(end)}{" "}
        {format(end, "zzz")}
      </span>
    );
  }

  return (
    <span>
      {format(start, "Pp")} &mdash; {format(end, "p zzz")}
    </span>
  );
};

function formatTimeOnly(date: Date) {
  // 12:00 AM
  return format(date, "p");
}
