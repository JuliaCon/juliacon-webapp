import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    talk(id: ID!): Talk
    talks: [Talk!]!

    room(id: ID!): Room
    rooms: [Room!]!
  }

  type Talk {
    id: ID!
    title: String!
    abstract: String
    description: String

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

    talks: [Talk!]!
  }
`;
