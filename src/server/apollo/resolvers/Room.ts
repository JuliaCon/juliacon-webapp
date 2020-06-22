import { RoomResolvers } from "./__types__";
import { filterTalks } from "../../pretalx";
import { ConferenceDay, isConferenceDay } from "../../../const";

export const Room: RoomResolvers = {
  id: (root) => String(root.id),
  talks: async (root, { day }, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();

    if (day && !isConferenceDay(day)) {
      throw new Error(`Day specified is not a valid conference day`);
    }

    return filterTalks(talks, {
      roomId: root.id,
      day: day as ConferenceDay | null,
    });
  },
};
