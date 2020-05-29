import { PretalxAPI } from "../pretalx";

export interface DataSources {
  pretalx: PretalxAPI;
}

export function dataSources() {
  return { pretalx: new PretalxAPI() };
}
