import { format } from "date-fns";

import { asyncMap } from "../../../utils/async";
import { isNonNull } from "../../../utils/null";

import { PosterResolvers } from "./__types__";

export const Poster: PosterResolvers = {
  
  pdflink: (root, _args, { dataSources }) => {
    return `/uploads/posters/${root.id}.pdf`;
  },
  
  speakers: async (root, _args, { dataSources }) => {
    const speakers = await asyncMap(root.speakerIds, (speakerId) =>
      dataSources.pretalx.getSpeaker(speakerId)
    );
    return speakers.filter(isNonNull);
  },

  

};
