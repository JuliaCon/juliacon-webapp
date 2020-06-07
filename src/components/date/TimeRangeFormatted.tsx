import React from "react";
import { format, isSameDay, parseISO } from "date-fns";

export interface TimeRangeFormattedProps {
  start: string;
  end: string;
}
export const TimeRangeFormatted: React.FC<TimeRangeFormattedProps> = ({
  start,
  end,
}) => {
  const startTime = parseISO(start);
  const endTime = parseISO(end);

  if (isSameDay(startTime, endTime)) {
    return (
      <span>
        {formatTimeOnly(startTime)} &mdash; {formatTimeOnly(endTime)}
      </span>
    );
  }

  return (
    <span>
      {format(startTime, "Pp")} &mdash; {format(endTime, "Pp")}
    </span>
  );
};

function formatTimeOnly(date: Date) {
  // 12:00 AM
  return format(date, "p");
}
