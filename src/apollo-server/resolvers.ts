import {
  QueryResolvers,
  SpeakerResolvers,
  TalkResolvers,
} from "./resolvers-types";
import { asyncMap } from "../utils/async";
import { isNonNull } from "../utils/null";
import { Resolvers } from "@apollo/client";

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

// Note: we do type assertion because graphql-codegen types are more strict
// and don't match the very generic types of Apollo's Resolvers type
export const resolvers: Resolvers = {
  Query,
  Speaker,
  Talk,
} as any;
