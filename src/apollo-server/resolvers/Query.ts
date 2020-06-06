import { QueryResolvers } from "./__types__";

export const Query: QueryResolvers = {
  talks: (_root, _args, { dataSources }) => {
    return dataSources.pretalx.getAllTalks();
  },
  talk: (root, args, { dataSources }) => {
    const { id } = args as { id: string };
    return dataSources.pretalx.getTalk(id);
  },

  rooms: (_root, _args, { dataSources }) => {
    return dataSources.pretalx.getAllRooms();
  },
  room: async (_root, { id }, { dataSources }) => {
    return dataSources.pretalx.getRoom(id);
  },
};
