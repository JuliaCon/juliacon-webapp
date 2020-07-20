import { format } from "date-fns";

import { asyncMap } from "../../../utils/async";
import { isNonNull } from "../../../utils/null";

import { PosterResolvers } from "./__types__";

export const Poster: PosterResolvers = {
  
  id: async (root, _args, { dataSources }) => {
    return dataSources.pretalx.getPoster(root.posterId);
  },

  title: async (root, _args, { dataSources }) => {
    return dataSources.pretalx.getPoster(root.posterId);
  },

  abstract: async (root, _args, { dataSources }) => {
    return dataSources.pretalx.getPoster(root.posterId);
  },

  description: async (root, _args, { dataSources }) => {
    return dataSources.pretalx.getPoster(root.posterId);
  },

  day: (root) => {
    const date = new Date(root.startTime);
    return format(date, `yyyy-MM-dd`);
  },

  pdflink: async (root, _args, { dataSources }) => {
    return dataSources.pretalx.getPoster(root.posterId);
  },
  
  speakers: async (root, _args, { dataSources }) => {
    const speakers = await asyncMap(root.speakerIds, (speakerId) =>
      dataSources.pretalx.getPoster(speakerId)
    );
    return speakers.filter(isNonNull);
  },

  

};
