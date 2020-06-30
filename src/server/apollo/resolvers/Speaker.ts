import { SpeakerResolvers } from "./__types__";

export const Speaker: SpeakerResolvers = {
  talks: async (root, _args, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();
    const result = talks.filter((talk) => talk.speakerIds.includes(root.id));

    return result;
  },
};
