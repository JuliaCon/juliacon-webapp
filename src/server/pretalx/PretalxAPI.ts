import { DataSource } from "apollo-datasource";

import { ALL_ROOMS } from "./PretalxAPIRoom";
import { ALL_SPEAKERS } from "./PretalxAPISpeaker";
import { ALL_TALKS } from "./PretalxAPITalk";

export class PretalxAPI extends DataSource {
  async getAllSpeakers() {
    return ALL_SPEAKERS;
  }

  async getSpeaker(id: string) {
    return (
      (await this.getAllSpeakers()).find((speaker) => speaker.id === id) || null
    );
  }

  async getAllTalks() {
    // Preemptively fetch the list of speakers as well (since it's likely we'll
    // need access to that too in the near future)
    this.getAllSpeakers().then(() => void 0);

    return ALL_TALKS;
  }

  async getTalk(id: string) {
    const allTalks = await this.getAllTalks();
    return allTalks.find((talk) => talk.id === id);
  }

  async getAllRooms() {
    // Preemptively fetch the list of talks (we'll need those soon anyway)
    this.getAllTalks().then(() => void 0);

    return ALL_ROOMS;
  }

  async getRoom(id: string) {
    const rooms = await this.getAllRooms();
    return rooms.find((room) => room.id === id);
  }
}
