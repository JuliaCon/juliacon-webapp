import { assertConferenceDay } from "../../../const";
import { filterTalks } from "../../pretalx";
import { talkTypeToSubmissionType } from "../utils";
import { QueryResolvers } from "./__types__";

export const Query: QueryResolvers = {
  talks: async (_root, args, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();

    const { roomId, talkType } = args;

    return filterTalks(talks, {
      day: args.day ? assertConferenceDay(args.day) : undefined,
      roomId,
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

  speaker: async (_root, { id }, { dataSources }) => {
    return dataSources.pretalx.getSpeaker(id);

  },
  
  posters: async (_root, _args, { dataSources }) => {
      return dataSources.pretalx.getAllPosters();  

  },
  
  poster: async (_root, { id }, { dataSources }) => {
      return dataSources.pretalx.getPoster(id);

  },
};
