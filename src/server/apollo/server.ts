import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import { dataSources } from "./DataSources";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

export const apolloSchema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export const apolloServer = new ApolloServer({
  dataSources,
  playground: true,
  schema: apolloSchema,
});
