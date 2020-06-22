export const PRETALX_EVENT_CODE = "juliacon2019";
export const PRETALX_API_URL = `https://pretalx.com/api/events/${PRETALX_EVENT_CODE}`;

export async function apiFetch(path: string): Promise<unknown> {
  const url = PRETALX_API_URL + (path.startsWith("/") ? "" : "/") + path;
  const result = await fetch(url);
  return result.json();
}
