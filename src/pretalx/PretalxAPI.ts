import { RESTDataSource } from "apollo-datasource-rest";

import { PRETALX_API_URL } from "./pretalx";
import { PretalxAPISpeaker } from "./PretalxAPISpeaker";
import { PretalxAPITalk } from "./PretalxAPITalk";

const CACHE_TTL = 60 * 10;

export class PretalxAPI extends RESTDataSource {
  baseURL = PRETALX_API_URL;

  get: RESTDataSource["get"] = async (path, params, options) => {
    return super.get(path, params, {
      ...options,
      cacheOptions: {
        ttl: CACHE_TTL,
        ...options?.cacheOptions,
      },
    });
  };

  async getAllSpeakers() {
    interface Response {
      results: readonly PretalxAPISpeaker[];
    }
    const response = await this.get<Response>("speakers", {
      limit: 500,
    });
    return response.results;
  }

  async getSpeaker(id: string) {
    const speakers = await this.getAllSpeakers();
    return speakers.find((speaker) => speaker.code === id) || null;
  }

  async getAllTalks() {
    // Preemptively fetch the list of speakers as well (since it's likely we'll
    // need access to that too in the near future)
    this.getAllSpeakers().then(() => void 0);

    interface Response {
      results: readonly PretalxAPITalk[];
    }
    const response = await this.get<Response>("talks", {
      limit: 500,
    });
    return response.results;
  }

  async getTalk(id: string) {
    const allTalks = await this.getAllTalks();
    return allTalks.find((talk) => talk.code === id);
  }
}
