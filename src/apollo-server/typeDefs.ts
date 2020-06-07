import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    talk(id: ID!): Talk
    talks(day: String, roomId: ID, talkType: TalkType): [Talk!]!

    room(id: ID!): Room
    rooms: [Room!]!
  }

  type Talk {
    id: ID!
    title: String!
    abstract: String
    description: String
    day: String!
    type: TalkType!

    speakers: [Speaker!]!
    room: Room
  }

  type Speaker {
    id: ID!
    name: String!
    biography: String

    """
    The URL of the user's upload avatar image.
    """
    avatar: String
  }

  type Room {
    id: ID!
    name: String!
    description: String

    """
    The talks scheduled to occur in this room.

    ### Optional Arguments
    * \`day\` - The conference day to fetch talks for.
        Must be in format \`YYYY-MM-DD\`.
    """
    talks(day: String): [Talk!]!
  }

  enum TalkType {
    BIRDS_OF_FEATHER
    BREAK
    KEYNOTE
    LIGHTNING_TALK
    MINISYMPOSIUM
    SPONSOR_ADDRESS
    TALK
    WORKSHOP_FULL_DAY
    WORKSHOP_HALF_DAY
  }
`;
