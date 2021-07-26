export function getDayString(date: Date) {
  return date.toISOString().substr(0, 10);
}
