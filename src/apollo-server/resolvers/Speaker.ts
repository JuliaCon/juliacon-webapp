import { SpeakerResolvers } from "./__types__";

export const Speaker: SpeakerResolvers = {
  id: (root) => root.code,
};
