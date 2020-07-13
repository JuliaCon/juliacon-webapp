import React from "react";
import { format } from "date-fns";

import { now } from "../../utils/time";
import { useLiveTalks } from "./useLiveTalks";

export const LiveTalksView = () => {
  const [time, setTime] = React.useState(() => now());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(now()), 1000);
    return () => clearInterval(interval);
  });

  const talks = useLiveTalks(time);

  return (
    <div>
      <p>{format(time, "yyyy-MM-dd HH:mm")}</p>
      <h1>Current Talks</h1>
      {talks.map((talk) => (
        <p key={talk.id}>{talk.title}</p>
      ))}
    </div>
  );
};
