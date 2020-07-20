import { format } from "date-fns";

import { asyncMap } from "../../../utils/async";
import { isNonNull } from "../../../utils/null";

import { submissionTypeToTalkType } from "../utils";
import { TalkResolvers } from "./__types__";

export const Talk: TalkResolvers = {
  speakers: async (root, _args, { dataSources }) => {
    const speakers = await asyncMap(root.speakerIds, (speakerId) =>
      dataSources.pretalx.getSpeaker(speakerId)
    );
    return speakers.filter(isNonNull);
  },

  room: async (root, _args, { dataSources }) => {
    const room = await dataSources.pretalx.getRoom(root.roomId);
    if (!room) {
      throw new Error(`Failed to lookup room for talk ${root.id}`);
    }
    return room;
  },

  day: (root) => {
    const date = new Date(root.startTime);
    return format(date, `yyyy-MM-dd`);
  },

  type: (root) => {
    return submissionTypeToTalkType(root.submissionType);
  },

  videoCode: (root, _args, { dataSources }) => {
    return dataSources.videoCodes.getTalkVideoCode(root.id);
  },
};
