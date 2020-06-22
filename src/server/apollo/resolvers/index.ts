import { Resolvers } from "@apollo/client";
import { Query } from "./Query";
import { Speaker } from "./Speaker";
import { Talk } from "./Talk";
import { Room } from "./Room";

// Note: we do type assertion because graphql-codegen types are more strict
// and don't match the very generic types of Apollo's Resolvers type
export const resolvers: Resolvers = {
  Query,
  Speaker,
  Talk,
  Room,
} as any;
