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
  schema: apolloSchema,

  // Normally, the GraphQL playground and schema introspection are disabled in
  // prod, but due to the community nature of this project, we don't need to do
  // that.
  playground: true,
  introspection: true,
});
