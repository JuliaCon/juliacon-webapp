import { nullthrows } from "../../utils/invariant";

/**
 * An object whose keys are locales and whose values are the text in that locale.
 *
 * @example
 *   {
 *     "en": "Lightning Talk"
 *   }
 */
export type LocalizedText = Record<string, string | undefined>;

export function getText(text: string | LocalizedText): string {
  if (typeof text === "string") return text;
  return nullthrows(text["en"], `Failed to get string from LocalizedText`);
}
