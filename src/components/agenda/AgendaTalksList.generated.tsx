import * as Types from "../../apollo/__generated__/types";

import { AgendaTalksListItemFragment } from "./AgendaTalksListItem.generated";
import gql from "graphql-tag";
import { AgendaTalksListItemFragmentDoc } from "./AgendaTalksListItem.generated";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

export type AgendaTalksListQueryVariables = Types.Exact<{
  conferenceDay: Types.Scalars["String"];
}>;

export type AgendaTalksListQuery = { readonly __typename?: "Query" } & {
  readonly talks: ReadonlyArray<
    { readonly __typename?: "Talk" } & AgendaTalksListItemFragment
  >;
};

export const AgendaTalksListDocument = gql`
  query AgendaTalksList($conferenceDay: String!) {
    talks(day: $conferenceDay) {
      ...AgendaTalksListItem
    }
  }
  ${AgendaTalksListItemFragmentDoc}
`;

/**
 * __useAgendaTalksListQuery__
 *
 * To run a query within a React component, call `useAgendaTalksListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAgendaTalksListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAgendaTalksListQuery({
 *   variables: {
 *      conferenceDay: // value for 'conferenceDay'
 *   },
 * });
 */
export function useAgendaTalksListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AgendaTalksListQuery,
    AgendaTalksListQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AgendaTalksListQuery,
    AgendaTalksListQueryVariables
  >(AgendaTalksListDocument, baseOptions);
}
export function useAgendaTalksListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AgendaTalksListQuery,
    AgendaTalksListQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AgendaTalksListQuery,
    AgendaTalksListQueryVariables
  >(AgendaTalksListDocument, baseOptions);
}
export type AgendaTalksListQueryHookResult = ReturnType<
  typeof useAgendaTalksListQuery
>;
export type AgendaTalksListLazyQueryHookResult = ReturnType<
  typeof useAgendaTalksListLazyQuery
>;
export type AgendaTalksListQueryResult = ApolloReactCommon.QueryResult<
  AgendaTalksListQuery,
  AgendaTalksListQueryVariables
>;
