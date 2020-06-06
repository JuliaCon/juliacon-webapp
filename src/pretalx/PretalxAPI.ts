import { RESTDataSource } from "apollo-datasource-rest";

import { PRETALX_API_URL } from "./pretalx";
import { PretalxAPISpeaker } from "./PretalxAPISpeaker";
import { PretalxAPITalk } from "./PretalxAPITalk";
import { PretalxAPIRoom } from "./PretalxAPIRoom";

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

  async getAllRooms() {
    // Preemptively fetch the list of talks (we'll need those soon anyway)
    this.getAllTalks().then(() => void 0);

    interface Response {
      count: number;
      results: readonly PretalxAPIRoom[];
    }
    const response = await this.get<Response>("rooms", {
      limit: 500,
    });
    return response.results.map((room) => ({
      ...room,
      // Convert room id to string for consistency
      id: String(room.id),
    }));
  }

  async getRoom(id: string) {
    const rooms = await this.getAllRooms();
    return rooms.find((room) => room.id === id);
  }

  /**
   * Find a given room given it's (English) name.
   *
   * This is necessary since the Pretalx API `talks` endpoint only includes the
   * room's name (not it's id).
   */
  async getRoomByName(name: string) {
    const allRooms = await this.getAllRooms();
    return allRooms.find((room) => room.name["en"] === name);
  }
}
