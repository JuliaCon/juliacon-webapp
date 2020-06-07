import * as Types from "../../apollo/__generated__/types";

import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

export type TalkOverviewQueryVariables = {
  id: Types.Scalars["ID"];
};

export type TalkOverviewQuery = { readonly __typename?: "Query" } & {
  readonly talk?: Types.Maybe<
    { readonly __typename?: "Talk" } & TalkOverviewFragment
  >;
};

export type TalkOverviewFragment = { readonly __typename?: "Talk" } & Pick<
  Types.Talk,
  "id" | "title" | "abstract" | "type" | "startTime" | "endTime"
> & {
    readonly room?: Types.Maybe<
      { readonly __typename?: "Room" } & Pick<Types.Room, "name">
    >;
    readonly speakers: ReadonlyArray<
      { readonly __typename?: "Speaker" } & Pick<
        Types.Speaker,
        "name" | "avatar"
      >
    >;
  };

export const TalkOverviewFragmentDoc = gql`
  fragment TalkOverview on Talk {
    id
    title
    abstract
    type
    startTime
    endTime
    room {
      name
    }
    speakers {
      name
      avatar
    }
  }
`;
export const TalkOverviewDocument = gql`
  query TalkOverview($id: ID!) {
    talk(id: $id) {
      ...TalkOverview
    }
  }
  ${TalkOverviewFragmentDoc}
`;

/**
 * __useTalkOverviewQuery__
 *
 * To run a query within a React component, call `useTalkOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useTalkOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTalkOverviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTalkOverviewQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TalkOverviewQuery,
    TalkOverviewQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    TalkOverviewQuery,
    TalkOverviewQueryVariables
  >(TalkOverviewDocument, baseOptions);
}
export function useTalkOverviewLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TalkOverviewQuery,
    TalkOverviewQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    TalkOverviewQuery,
    TalkOverviewQueryVariables
  >(TalkOverviewDocument, baseOptions);
}
export type TalkOverviewQueryHookResult = ReturnType<
  typeof useTalkOverviewQuery
>;
export type TalkOverviewLazyQueryHookResult = ReturnType<
  typeof useTalkOverviewLazyQuery
>;
export type TalkOverviewQueryResult = ApolloReactCommon.QueryResult<
  TalkOverviewQuery,
  TalkOverviewQueryVariables
>;
