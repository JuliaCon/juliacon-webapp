import { PretalxAPISpeaker } from "./PretalxAPISpeaker";

/**
 * An object whose keys are locales and whose values are the text in that locale.
 *
 * @example
 *   {
 *     "en": "Lightning Talk"
 *   }
 */
export type LocalizedText = Record<string, string>;

export interface PretalxAPITalk {
  code: string;
  speakers: readonly PretalxAPISpeaker[];
  title: string;
  submission_type: LocalizedText;
  track?: string | null;
  state?: "accepted" | "confirmed" | "rejected" | "submitted";
  abstract: string;
  description: string;
  duration?: string;
  do_not_record?: boolean;
  is_featured?: boolean;
  content_locale?: string;
  slot: {
    room?: LocalizedText;
    start: string;
    end: string;
  };
  slot_count?: number;
}

export function sortTalksByTime(talks: readonly PretalxAPITalk[]) {
  return [...talks].sort((a, b) => {
    return new Date(a.slot.start).getTime() - new Date(b.slot.end).getTime();
  });
}
