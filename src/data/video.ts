import DATA from "../../data/videos.json";

export interface VideoData {
  code: string | null;
  isLive: boolean;
}

/**
 * Get the YouTube video code for a given talk.
 *
 * May return null if the talk has no video associated (e.g., the "talk" is a
 * social event that is taking place on another platform) or if the talkId could
 * not be located.
 */
export function getVideoDataForTalk(talkId: string): VideoData | null {
  const data = DATA.find((t) => t.id === talkId);
  if (!data) return null;
  return {
    code: data.youtubeCode,
    isLive: data.live || false,
  };
}
