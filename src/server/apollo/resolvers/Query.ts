import { assertConferenceDay } from "../../../const";
import { filterTalks } from "../../pretalx";
import { talkTypeToSubmissionType } from "../utils";
import { QueryResolvers } from "./__types__";
import { addMinutes } from "../../../utils/addMinutes";

export const Query: QueryResolvers = {
  talks: async (_root, args, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();

    let newTalks = [];

    for (var i = 0; i < talks.length; i++) {
      newTalks.push({ ...talks[i] });
    }

    for (i = 0; i < newTalks.length; i++) {
      newTalks[i].startTime = addMinutes(
        newTalks[i].startTime,
        args.zoneOffset
      );
      newTalks[i].endTime = addMinutes(newTalks[i].endTime, args.zoneOffset);
    }

    const { roomId, talkType } = args;

    return filterTalks(newTalks, {
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
};
