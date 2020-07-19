import { isConferenceDay } from "../../../const";
import { filterTalks } from "../../pretalx";
import { talkTypeToSubmissionType } from "../utils";
import { QueryResolvers } from "./__types__";
import { isNonNull } from "../../../utils/null";

export const Query: QueryResolvers = {
  talks: async (_root, args, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();

    const { day, roomId, talkType } = args;

    // If we pass an invalid day, just return no talks.
    if (isNonNull(day) && !isConferenceDay(day)) {
      return [];
    }

    return filterTalks(talks, {
      day: day,
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
};
