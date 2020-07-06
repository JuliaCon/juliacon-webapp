import { isNonNull } from "./null";

// Adds some number of minutes to a time passed as a string in ISO format
// Null values are treated as zeroes
export function addMinutes(time: string, minutes: number | null | undefined) {
  minutes = isNonNull(minutes) ? minutes : 0;
  let newTime = new Date(time);
  return new Date(newTime.getTime() + minutes * 60000).toISOString();
}
