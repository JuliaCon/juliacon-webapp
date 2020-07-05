export function addMinutes(time: string, minutes: number) {
  let newTime = new Date(time);
  return new Date(newTime.getTime() + minutes).toISOString();
}
