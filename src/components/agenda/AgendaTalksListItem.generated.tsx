import * as Types from "../../apollo/__generated__/types";

import { SpeakerInfoFragment } from "../speaker/SpeakerInfo.generated";
import gql from "graphql-tag";
import { SpeakerInfoFragmentDoc } from "../speaker/SpeakerInfo.generated";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

export type AgendaTalksListItemQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;

export type AgendaTalksListItemQuery = { readonly __typename?: "Query" } & {
  readonly talk?: Types.Maybe<
    { readonly __typename?: "Talk" } & AgendaTalksListItemFragment
  >;
};

export type AgendaTalksListItemFragment = {
  readonly __typename?: "Talk";
} & Pick<
  Types.Talk,
  "id" | "title" | "abstract" | "description" | "type" | "startTime" | "endTime"
> & {
    readonly room: { readonly __typename?: "Room" } & Pick<Types.Room, "name">;
    readonly speakers: ReadonlyArray<
      { readonly __typename?: "Speaker" } & SpeakerInfoFragment
    >;
  };

export const AgendaTalksListItemFragmentDoc = gql`
  fragment AgendaTalksListItem on Talk {
    id
    title
    abstract
    description
    type
    startTime
    endTime
    room {
      name
    }
    speakers {
      ...SpeakerInfo
    }
  }
  ${SpeakerInfoFragmentDoc}
`;
export const AgendaTalksListItemDocument = gql`
  query AgendaTalksListItem($id: ID!) {
    talk(id: $id) {
      ...AgendaTalksListItem
    }
  }
  ${AgendaTalksListItemFragmentDoc}
`;

/**
 * __useAgendaTalksListItemQuery__
 *
 * To run a query within a React component, call `useAgendaTalksListItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useAgendaTalksListItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAgendaTalksListItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAgendaTalksListItemQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AgendaTalksListItemQuery,
    AgendaTalksListItemQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    AgendaTalksListItemQuery,
    AgendaTalksListItemQueryVariables
  >(AgendaTalksListItemDocument, baseOptions);
}
export function useAgendaTalksListItemLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AgendaTalksListItemQuery,
    AgendaTalksListItemQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    AgendaTalksListItemQuery,
    AgendaTalksListItemQueryVariables
  >(AgendaTalksListItemDocument, baseOptions);
}
export type AgendaTalksListItemQueryHookResult = ReturnType<
  typeof useAgendaTalksListItemQuery
>;
export type AgendaTalksListItemLazyQueryHookResult = ReturnType<
  typeof useAgendaTalksListItemLazyQuery
>;
export type AgendaTalksListItemQueryResult = ApolloReactCommon.QueryResult<
  AgendaTalksListItemQuery,
  AgendaTalksListItemQueryVariables
>;
