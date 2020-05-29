import { DataSources } from "./DataSources";
import {
  QueryResolvers,
  SpeakerResolvers,
  TalkResolvers,
} from "./resolvers-types";
import { asyncMap } from "../utils/async";
import { isNonNull } from "../utils/null";

interface ResolverContext {
  dataSources: DataSources;
}
interface Resolvers<T = unknown> {
  [field: string]: (root: T, args: object, ctx: ResolverContext) => unknown;
}

const Query: QueryResolvers = {
  talks: (_root, _args, { dataSources }) => {
    return dataSources.pretalx.getAllTalks();
  },
  talk: (root, args, { dataSources }) => {
    const { id } = args as { id: string };
    return dataSources.pretalx.getTalk(id);
  },
};

const Speaker: SpeakerResolvers = {
  id: (root) => root.code,
};

const Talk: TalkResolvers = {
  id: (root) => root.code,
  speakers: async (root, _args, { dataSources }) => {
    const speakers = await asyncMap(root.speakers, (speaker) =>
      dataSources.pretalx.getSpeaker(speaker.code)
    );
    return speakers.filter(isNonNull);
  },
};

export const resolvers = {
  Query,
  Speaker,
  Talk,
};
