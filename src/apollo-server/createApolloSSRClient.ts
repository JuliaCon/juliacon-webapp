import { SchemaLink } from "@apollo/link-schema";

import { createApolloClient } from "../apollo";
import { apolloSchema } from "./server";
import { ResolverContext } from "./ResolverContext";
import { dataSources } from "./DataSources";

/**
 * Create an Apollo client instance for use with SSR.
 *
 * This uses Apollo LinkSchema to execute queries directly against the in-memory
 * GraphQL schema rather than communicating over the network.
 */
export function createApolloSSRClient() {
  const context: ResolverContext = { dataSources: dataSources() };
  const link = new SchemaLink({
    schema: apolloSchema,
    context: (): ResolverContext => context,
  });

  return createApolloClient({ link, ssrMode: true });
}
