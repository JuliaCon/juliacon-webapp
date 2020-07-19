import { DataSource } from "apollo-datasource";

import data from "../../../data/videocodes.json";

const videoCodes: Record<string, string | null> = data.videoCodes;

export class VideoCodes extends DataSource {
  getTalkVideoCode(talkId: string) {
    return videoCodes[talkId] || null;
  }
}
