import * as Types from "../../apollo/__generated__/types";

import { SpeakerInfoFragment } from "./SpeakerInfo.generated";
import { AgendaTalksListItemFragment } from "../agenda/AgendaTalksListItem.generated";
import gql from "graphql-tag";
import { SpeakerInfoFragmentDoc } from "./SpeakerInfo.generated";
import { AgendaTalksListItemFragmentDoc } from "../agenda/AgendaTalksListItem.generated";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

export type SpeakerDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;

export type SpeakerDetailsQuery = { readonly __typename?: "Query" } & {
  readonly speaker?: Types.Maybe<
    { readonly __typename?: "Speaker" } & Pick<
      Types.Speaker,
      "id" | "avatar" | "name" | "biography"
    > & {
        readonly talks: ReadonlyArray<
          { readonly __typename?: "Talk" } & Pick<Types.Talk, "id"> &
            AgendaTalksListItemFragment
        >;
      } & SpeakerInfoFragment
  >;
};

export const SpeakerDetailsDocument = gql`
  query SpeakerDetails($id: ID!) {
    speaker(id: $id) {
      ...SpeakerInfo
      id
      avatar
      name
      biography
      talks {
        id
        ...AgendaTalksListItem
      }
    }
  }
  ${SpeakerInfoFragmentDoc}
  ${AgendaTalksListItemFragmentDoc}
`;

/**
 * __useSpeakerDetailsQuery__
 *
 * To run a query within a React component, call `useSpeakerDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpeakerDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpeakerDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSpeakerDetailsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SpeakerDetailsQuery,
    SpeakerDetailsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    SpeakerDetailsQuery,
    SpeakerDetailsQueryVariables
  >(SpeakerDetailsDocument, baseOptions);
}
export function useSpeakerDetailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SpeakerDetailsQuery,
    SpeakerDetailsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SpeakerDetailsQuery,
    SpeakerDetailsQueryVariables
  >(SpeakerDetailsDocument, baseOptions);
}
export type SpeakerDetailsQueryHookResult = ReturnType<
  typeof useSpeakerDetailsQuery
>;
export type SpeakerDetailsLazyQueryHookResult = ReturnType<
  typeof useSpeakerDetailsLazyQuery
>;
export type SpeakerDetailsQueryResult = ApolloReactCommon.QueryResult<
  SpeakerDetailsQuery,
  SpeakerDetailsQueryVariables
>;
