import { isNonNull } from "./null";

export function addMinutes(time: string, minutes: number | null | undefined) {
  minutes = isNonNull(minutes) ? minutes : 0;
  let newTime = new Date(time);
  return new Date(newTime.getTime() + minutes * 60000).toISOString();
}
