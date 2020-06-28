import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/link-batch-http";
import { typePolicies } from "./typePolicies";

// Augment the type of ApolloClient so that we can add the toJSON method
declare module "@apollo/client" {
  // It seems ESLint has a false positive here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class ApolloClient<TCacheShape> {
    toJSON?: () => unknown;
  }
}

export type Apollo = ApolloClient<NormalizedCacheObject>;

interface CreateApolloClientArgs {
  data?: NormalizedCacheObject;
  ssrMode?: boolean;
  link?: ApolloLink;
}

export function createApolloClient(args: CreateApolloClientArgs = {}): Apollo {
  const { data, ssrMode = false } = args;

  const link =
    args.link ||
    new BatchHttpLink({
      uri: `/api/graphql`,
    });

  const cache = new InMemoryCache({
    typePolicies,
  });
  data && cache.restore(data);

  const client = new ApolloClient({
    ssrMode,
    cache,
    link,
  });

  // We need to tell Next.js to not serialize the Apollo client when sending
  // data to the browser
  client.toJSON = () => null;

  return client;
}
