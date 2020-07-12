import React from "react";
import { now } from "../../utils/time";
import { format } from "date-fns";

export const LiveTalksView = () => {
  const [time, setTime] = React.useState(() => now());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(now()), 1000);
    return () => clearInterval(interval);
  });

  return <p>{format(time, "HH:mm")}</p>;
};
