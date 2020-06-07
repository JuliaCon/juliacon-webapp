import { format } from "date-fns";

import { getText } from "../../pretalx";
import { asyncMap } from "../../utils/async";
import { isNonNull } from "../../utils/null";

import { submissionTypeToTalkType } from "../utils";
import { TalkResolvers } from "./__types__";

export const Talk: TalkResolvers = {
  id: (root) => root.code,
  startTime: (root) => root.slot.start,
  endTime: (root) => root.slot.end,

  speakers: async (root, _args, { dataSources }) => {
    const speakers = await asyncMap(root.speakers, (speaker) =>
      dataSources.pretalx.getSpeaker(speaker.code)
    );
    return speakers.filter(isNonNull);
  },

  room: async (root, _args, { dataSources }) => {
    const roomName = root.slot.room["en"];
    if (!roomName) return null;
    return dataSources.pretalx.getRoomByName(roomName);
  },

  day: (root) => {
    const date = new Date(root.slot.start);
    return format(date, `yyyy-MM-dd`);
  },

  type: (root) => {
    return submissionTypeToTalkType(getText(root.submission_type));
  },
};
