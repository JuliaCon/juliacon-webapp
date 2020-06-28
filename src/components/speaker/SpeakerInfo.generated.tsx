import * as Types from "../../apollo/__generated__/types";

import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

export type SpeakerInfoQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;

export type SpeakerInfoQuery = { readonly __typename?: "Query" } & {
  readonly speaker?: Types.Maybe<
    { readonly __typename?: "Speaker" } & SpeakerInfoFragment
  >;
};

export type SpeakerInfoFragment = { readonly __typename?: "Speaker" } & Pick<
  Types.Speaker,
  "id" | "name" | "avatar"
>;

export const SpeakerInfoFragmentDoc = gql`
  fragment SpeakerInfo on Speaker {
    id
    name
    avatar
  }
`;
export const SpeakerInfoDocument = gql`
  query SpeakerInfo($id: ID!) {
    speaker(id: $id) {
      ...SpeakerInfo
    }
  }
  ${SpeakerInfoFragmentDoc}
`;

/**
 * __useSpeakerInfoQuery__
 *
 * To run a query within a React component, call `useSpeakerInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpeakerInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpeakerInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSpeakerInfoQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SpeakerInfoQuery,
    SpeakerInfoQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SpeakerInfoQuery, SpeakerInfoQueryVariables>(
    SpeakerInfoDocument,
    baseOptions
  );
}
export function useSpeakerInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SpeakerInfoQuery,
    SpeakerInfoQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SpeakerInfoQuery,
    SpeakerInfoQueryVariables
  >(SpeakerInfoDocument, baseOptions);
}
export type SpeakerInfoQueryHookResult = ReturnType<typeof useSpeakerInfoQuery>;
export type SpeakerInfoLazyQueryHookResult = ReturnType<
  typeof useSpeakerInfoLazyQuery
>;
export type SpeakerInfoQueryResult = ApolloReactCommon.QueryResult<
  SpeakerInfoQuery,
  SpeakerInfoQueryVariables
>;
