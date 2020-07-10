import * as Types from "../apollo/__generated__/types";

import { SpeakerInfoFragment } from "./speaker/SpeakerInfo.generated";
import gql from "graphql-tag";
import { SpeakerInfoFragmentDoc } from "./speaker/SpeakerInfo.generated";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

export type TalkDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;

export type TalkDetailsQuery = { readonly __typename?: "Query" } & {
  readonly talk?: Types.Maybe<
    { readonly __typename?: "Talk" } & TalkDetailsFragment
  >;
};

export type TalkDetailsFragment = { readonly __typename?: "Talk" } & Pick<
  Types.Talk,
  "id" | "title" | "abstract" | "description" | "startTime" | "endTime"
> & {
    readonly speakers: ReadonlyArray<
      { readonly __typename?: "Speaker" } & SpeakerInfoFragment
    >;
  };

export const TalkDetailsFragmentDoc = gql`
  fragment TalkDetails on Talk {
    id
    title
    abstract
    description
    startTime
    endTime
    speakers {
      ...SpeakerInfo
    }
  }
  ${SpeakerInfoFragmentDoc}
`;
export const TalkDetailsDocument = gql`
  query TalkDetails($id: ID!) {
    talk(id: $id) {
      ...TalkDetails
    }
  }
  ${TalkDetailsFragmentDoc}
`;

/**
 * __useTalkDetailsQuery__
 *
 * To run a query within a React component, call `useTalkDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTalkDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTalkDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTalkDetailsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TalkDetailsQuery,
    TalkDetailsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TalkDetailsQuery, TalkDetailsQueryVariables>(
    TalkDetailsDocument,
    baseOptions
  );
}
export function useTalkDetailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TalkDetailsQuery,
    TalkDetailsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    TalkDetailsQuery,
    TalkDetailsQueryVariables
  >(TalkDetailsDocument, baseOptions);
}
export type TalkDetailsQueryHookResult = ReturnType<typeof useTalkDetailsQuery>;
export type TalkDetailsLazyQueryHookResult = ReturnType<
  typeof useTalkDetailsLazyQuery
>;
export type TalkDetailsQueryResult = ApolloReactCommon.QueryResult<
  TalkDetailsQuery,
  TalkDetailsQueryVariables
>;
