import { assertConferenceDay } from "../../../const";
import { filterTalks } from "../../pretalx";
import { talkTypeToSubmissionType } from "../utils";
import { QueryResolvers } from "./__types__";
import { addMinutes } from "date-fns";
import { isNonNull } from "../../../utils/null";
export const Query: QueryResolvers = {
  talks: async (_root, args, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();

    let newTalks = talks.map((talk) => ({ ...talk }));

    args.zoneOffset = isNonNull(args.zoneOffset) ? args.zoneOffset : 0;

    // Offset their times by the passed zoneOffset
    for (var i = 0; i < newTalks.length; i++) {
      newTalks[i].startTime = addMinutes(
        new Date(newTalks[i].startTime),
        args.zoneOffset
      ).toISOString();
      newTalks[i].endTime = addMinutes(
        new Date(newTalks[i].startTime),
        args.zoneOffset
      ).toISOString();
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
