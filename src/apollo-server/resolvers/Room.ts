import { RoomResolvers } from "./__types__";
import { nullthrows } from "../../utils/invariant";

export const Room: RoomResolvers = {
  id: (root) => String(root.id),
  name: (root) => nullthrows(root.name["en"], `Failed to load room name`),
  description: (root) => root.description["en"],
  talks: async (root, _args, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();
    return talks.filter((talk) => talk.slot.room["en"] === root.name["en"]);
  },
};
