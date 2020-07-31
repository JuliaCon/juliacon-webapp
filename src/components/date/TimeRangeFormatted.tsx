import React from "react";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";

export interface TimeRangeFormattedProps {
  start: string;
  end: string;
  collapseDay?: boolean;
}
export const TimeRangeFormatted: React.FC<TimeRangeFormattedProps> = ({
  start,
  end,
  collapseDay = false,
}) => {
  const startTime = parseISO(start);
  const endTime = parseISO(end);

  if (collapseDay) {
    return (
      <span>
        {formatTimeOnly(startTime)} &mdash; {formatTimeOnly(endTime)}{" "}
        {format(endTime, "zzz")}
      </span>
    );
  }

  return (
    <span>
      {format(startTime, "Pp")} &mdash; {format(endTime, "p zzz")}
    </span>
  );
};

function formatTimeOnly(date: Date) {
  // 12:00 AM
  return format(date, "p");
}
