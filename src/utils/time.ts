import { addHours } from "date-fns";

// This has the unfortunate side effect of causing the server rendered content
// and the browser rendered content to disagree since we can't access
// localStorage on the server. Since it's only a debug thing, it's not that big
// of a deal.
const DEBUG_HOURS_SHIFT = __SERVER__
  ? 0
  : Number(window.localStorage.getItem("DEBUG_HOURS_SHIFT"));

export function createDate(timestamp: string | Date) {
  let date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  if (DEBUG_HOURS_SHIFT) {
    date = addHours(date, DEBUG_HOURS_SHIFT);
  }

  return date;
}

export function now() {
  return createDate(new Date());
}

export function getDayString(date: Date) {
  return date.toISOString().substr(0, 10);
}
