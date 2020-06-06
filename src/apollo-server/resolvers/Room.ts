import { RoomResolvers } from "./__types__";
import { nullthrows } from "../../utils/invariant";
import { filterTalks } from "../../pretalx";
import { ConferenceDay, isConferenceDay } from "../../const";

export const Room: RoomResolvers = {
  id: (root) => String(root.id),
  name: (root) => nullthrows(root.name["en"], `Failed to load room name`),
  description: (root) => root.description["en"],
  talks: async (root, { day }, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();

    if (day && !isConferenceDay(day)) {
      throw new Error(`Day specified is not a valid conference day`);
    }

    return filterTalks(talks, {
      roomName: root.name["en"],
      day: day as ConferenceDay | null,
    });
  },
};
