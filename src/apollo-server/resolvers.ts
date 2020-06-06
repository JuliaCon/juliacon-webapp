import {
  QueryResolvers,
  RoomResolvers,
  SpeakerResolvers,
  TalkResolvers,
} from "./resolvers-types";
import { asyncMap } from "../utils/async";
import { isNonNull } from "../utils/null";
import { Resolvers } from "@apollo/client";
import { nullthrows } from "../utils/invariant";

const Query: QueryResolvers = {
  talks: (_root, _args, { dataSources }) => {
    return dataSources.pretalx.getAllTalks();
  },
  talk: (root, args, { dataSources }) => {
    const { id } = args as { id: string };
    return dataSources.pretalx.getTalk(id);
  },

  rooms: (_root, _args, { dataSources }) => {
    return dataSources.pretalx.getAllRooms();
  },
  room: async (_root, { id }, { dataSources }) => {
    return dataSources.pretalx.getRoom(id);
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
  room: async (root, _args, { dataSources }) => {
    const roomName = root.slot.room["en"];
    if (!roomName) return null;
    return dataSources.pretalx.getRoomByName(roomName);
  },
};

export const Room: RoomResolvers = {
  id: (root) => String(root.id),
  name: (root) => nullthrows(root.name["en"], `Failed to load room name`),
  description: (root) => root.description["en"],
  talks: async (root, _args, { dataSources }) => {
    const talks = await dataSources.pretalx.getAllTalks();
    return talks.filter((talk) => talk.slot.room["en"] === root.name["en"]);
  },
};

// Note: we do type assertion because graphql-codegen types are more strict
// and don't match the very generic types of Apollo's Resolvers type
export const resolvers: Resolvers = {
  Query,
  Speaker,
  Talk,
  Room,
} as any;
