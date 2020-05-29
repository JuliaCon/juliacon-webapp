import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    talk(id: ID!): Talk
    talks: [Talk!]!
  }

  type Talk {
    id: ID!
    title: String!
    abstract: String
    description: String

    speakers: [Speaker!]!
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
`;
