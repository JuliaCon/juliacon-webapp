// Adapted from
// https://github.com/vercel/next.js/blob/96c3b087011f8395c887666c7593b48e2a85d4a6/examples/with-apollo/lib/apollo.js

import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";

import { Apollo, createApolloClient } from "./client";

declare module "next" {
  // Augment the NextPageContext types
  interface NextPageContext {
    apolloClient?: Apollo;
  }
}

export function getApollo(ctx: NextPageContext): Apollo {
  if (ctx.apolloClient) return ctx.apolloClient;
  return (ctx.apolloClient = createApolloClient());
}

/**
 * Create a HOC to wrap a Next page component.
 *
 * The wrapped components will fetch all Apollo queries on the server side
 * before sending the result to the browser.
 */
export const withApollo = ({ ssr = true } = {}) => (
  PageComponent: NextPage
) => {
  const WithApollo: NextPage<{
    apolloClient?: Apollo;
    apolloState?: NormalizedCacheObject;
  }> = ({ apolloClient, apolloState, ...props }) => {
    const apolloRef = React.useRef<Apollo | null>(apolloClient || null);

    // When rendering in the frontend, the Apollo client is serialized as null,
    // so we have to initialize it now.
    // We use the lazy-ref React trick to do this.
    if (!apolloRef.current) {
      apolloRef.current = createApolloClient({
        data: apolloState,
      });
    }

    const client = apolloRef.current;
    return (
      <ApolloProvider client={client}>
        <PageComponent {...props} />
      </ApolloProvider>
    );
  };

  /**
   * Initialize the Apollo cache.
   *
   * This only runs on the server-side render, but props are serialized and
   * given to the component on the frontend.
   */
  WithApollo.getInitialProps = async (ctx) => {
    let initProps = (await PageComponent.getInitialProps?.(ctx)) || {};

    if (typeof window === "undefined") {
      const { AppTree } = ctx;
      if (ctx.res?.finished) {
        return initProps;
      }

      if (__SERVER__ && ssr && AppTree) {
        // This is a dynamic import to avoid including the contents of the
        // library in the frontend bundle
        const { getDataFromTree } = await import("@apollo/react-ssr");
        const { createApolloSSRClient } = await import(
          "../apollo-server/createApolloSSRClient"
        );

        const apolloClient = ctx.apolloClient
          ? ctx.apolloClient
          : (ctx.apolloClient = await createApolloSSRClient());

        try {
          // We discard the result here since all we really care about is that
          // it populates the Apollo cache
          await getDataFromTree(
            <AppTree pageProps={{ ...initProps, apolloClient }} />
          );
        } catch (error) {
          // An error in SSR shouldn't cause the page to return an error
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        const apolloState = apolloClient.cache.extract();
        return {
          ...initProps,
          apolloState,
          apolloClient,
        };
      }
    }

    return initProps;
  };

  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";
    WithApollo.displayName = `withApollo(${displayName})`;
  }
  return WithApollo;
};
