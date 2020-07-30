import { useLiveTalksQuery } from "./LiveTalks.generated";
import { getDayString } from "../../utils/time";
import { TalkType } from "../../apollo/__generated__/types";
import { addMinutes } from "date-fns";

export function useLiveTalks(time: Date) {
  const day = getDayString(time);
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

    // Workshops are live, and frequently go a bit over time. Since there is
    // nothing that comes after, we're just going to artificially extend the
    // end time by thirty minutes to allow for the workshop to wrap up instead
    // of chopping it off exactly when the scheduled time ends.
    const paddingMinutes = (() => {
      if (talk.type === TalkType.WorkshopHalfDay) {
        return 30;
      } else if (talk.isLive && !talk.nextTalk) {
        return 5;
      }
    })();

    let endDate = new Date(talk.endTime);
    if (paddingMinutes) {
      endDate = addMinutes(endDate, paddingMinutes);
    }
    const end = endDate.getTime();

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
