import { PretalxAPI, VideoCodes } from "../pretalx";

export type DataSources = ReturnType<typeof dataSources>;

export function dataSources() {
  return { pretalx: new PretalxAPI(), videoCodes: new VideoCodes() };
}
