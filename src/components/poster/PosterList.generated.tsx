import * as Types from "../../apollo/__generated__/types";

import { PosterListItemFragment } from "./PosterListItem.generated";
import gql from "graphql-tag";
import { PosterListItemFragmentDoc } from "./PosterListItem.generated";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

export type PosterListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type PosterListQuery = { readonly __typename?: "Query" } & {
  readonly posters: ReadonlyArray<
    { readonly __typename?: "Poster" } & PosterListItemFragment
  >;
};

export const PosterListDocument = gql`
  query PosterList {
    posters {
      ...PosterListItem
    }
  }
  ${PosterListItemFragmentDoc}
`;

/**
 * __usePosterListQuery__
 *
 * To run a query within a React component, call `usePosterListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePosterListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePosterListQuery({
 *   variables: {
 *   },
 * });
 */
export function usePosterListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PosterListQuery,
    PosterListQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PosterListQuery, PosterListQueryVariables>(
    PosterListDocument,
    baseOptions
  );
}
export function usePosterListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PosterListQuery,
    PosterListQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PosterListQuery,
    PosterListQueryVariables
  >(PosterListDocument, baseOptions);
}
export type PosterListQueryHookResult = ReturnType<typeof usePosterListQuery>;
export type PosterListLazyQueryHookResult = ReturnType<
  typeof usePosterListLazyQuery
>;
export type PosterListQueryResult = ApolloReactCommon.QueryResult<
  PosterListQuery,
  PosterListQueryVariables
>;
