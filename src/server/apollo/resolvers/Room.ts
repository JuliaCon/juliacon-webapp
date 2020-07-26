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
  color: (root) => {
    switch (root.name) {
      case "Red Track":
        return "#cb3c33";
      case "Green Track":
        return "#389826";
      case "Purple Track":
        return "#9558B2";
      default:
        return undefined;
    }
  },
};
