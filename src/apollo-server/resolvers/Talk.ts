import { TalkResolvers } from "./__types__";
import { asyncMap } from "../../utils/async";
import { isNonNull } from "../../utils/null";

export const Talk: TalkResolvers = {
  id: (root) => root.code,
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
};
