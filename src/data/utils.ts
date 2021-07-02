import { nullthrows } from "../utils/invariant";

export type LocalizedText = Record<string, string | undefined>;

/**
 * The Pretalx API can be inconsistent in how it returns text; sometime's it's
 * presented as a `LocalizedText` JSON object and sometimes it's just a string.
 */
export function getText(text: string | LocalizedText): string {
  if (typeof text === "string") return text;
  return nullthrows(text["en"], `Failed to get string from LocalizedText`);
}
