import { DataSource } from "apollo-datasource";

import data from "../../../data/videocodes.json";

const videoCodes: Record<
  string,
  typeof data.videoCodes[keyof typeof data.videoCodes]
> = data.videoCodes;

export class VideoCodes extends DataSource {
  getTalkVideoCode(talkId: string) {
    return videoCodes[talkId]?.youtubeCode || null;
  }

  getTalkIsLive(talkId: string) {
    return videoCodes[talkId]?.isLive || false;
  }
}
