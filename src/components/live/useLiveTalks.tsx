import { useLiveTalksQuery } from "./LiveTalks.generated";
import { format } from "date-fns";

export function useLiveTalks(time: Date) {
  const day = format(time, `yyyy-MM-dd`);
  const { data, error } = useLiveTalksQuery({
    variables: {
      day,
    },
  });
  if (error) throw error;
  const { talks } = data || {};
  if (!talks) return [];
  return talks.filter((talk) => {
    const start = new Date(talk.startTime).getTime();
    const end = new Date(talk.endTime).getTime();
    const current = time.getTime();
    return start <= current && current <= end;
  });
}
