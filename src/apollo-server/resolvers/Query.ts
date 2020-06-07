import { assertConferenceDay } from "../../const";
import { filterTalks } from "../../pretalx";
import { nullthrows } from "../../utils/invariant";

import { talkTypeToSubmissionType } from "../utils";
import { QueryResolvers } from "./__types__";

export const Query: QueryResolvers = {
  talks: async (_root, args, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();

    let roomName: string | null = null;
    if (args.roomId) {
      const room = await dataSources.pretalx.getRoom(args.roomId);
      if (!room) return [];
      roomName = nullthrows(room.name["en"]);
    }

    const { talkType } = args;
    return filterTalks(talks, {
      day: args.day ? assertConferenceDay(args.day) : undefined,
      roomName,
      submissionType: talkType && talkTypeToSubmissionType(talkType),
    });
  },

  talk: (root, { id }, { dataSources }) => {
    return dataSources.pretalx.getTalk(id);
  },

  rooms: (_root, _args, { dataSources }) => {
    return dataSources.pretalx.getAllRooms();
  },

  room: async (_root, { id }, { dataSources }) => {
    return dataSources.pretalx.getRoom(id);
  },
};
