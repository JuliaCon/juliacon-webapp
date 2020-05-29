import { ApolloServer } from "apollo-server-micro";
import { dataSources } from "./DataSources";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const apolloServer = new ApolloServer({
  typeDefs,
  dataSources,
  resolvers,
});
