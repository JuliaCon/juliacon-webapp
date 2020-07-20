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
  const result = talks.filter((talk) => {
    const start = new Date(talk.startTime).getTime();
    const end = new Date(talk.endTime).getTime();
    const current = time.getTime();
    return start <= current && current <= end;
  });

  // Note: It's only safe to sort (mutate!) here since filter returns a new
  // array so we're not messing anything up internally with Apollo.
  // We need to sort here to ensure that the talks are listed in a consistent
  // order.
  result.sort((a, b) => (a.room.id < b.room.id ? -1 : 1));
  return result;
}
