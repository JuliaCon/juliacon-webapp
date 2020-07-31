import { asyncMap } from "../../../utils/async";
import { isNonNull } from "../../../utils/null";

import { PosterDay, PosterResolvers } from "./__types__";
import { getPosterSession } from "../../pretalx";

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

  day: (root) => {
    switch (getPosterSession(root.id)) {
      case "one":
        return PosterDay.One;
      case "two":
        return PosterDay.Two;
    }
  },
};
