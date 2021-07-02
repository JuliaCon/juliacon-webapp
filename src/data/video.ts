import _data from "../../data/videocodes.json";

// We need this here to make TypeScript treat our JSON file as a having an index
// signature
type VideoCodesMap = Record<
  string,
  {
    youtubeCode: string | null;
    isLive: boolean | null;
  }
>;
const VIDEOCODES: VideoCodesMap = _data.videoCodes;

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
  const data = VIDEOCODES[talkId];
  if (!data) return null;
  return {
    code: data.youtubeCode,
    isLive: data.isLive || false,
  };
}
