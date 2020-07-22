import * as Types from "../../apollo/__generated__/types";

import { SpeakerInfoFragment } from "../speaker/SpeakerInfo.generated";
import gql from "graphql-tag";
import { SpeakerInfoFragmentDoc } from "../speaker/SpeakerInfo.generated";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

export type PosterListItemQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"];
}>;

export type PosterListItemQuery = { readonly __typename?: "Query" } & {
  readonly poster?: Types.Maybe<
    { readonly __typename?: "Poster" } & PosterListItemFragment
  >;
};

export type PosterListItemFragment = { readonly __typename?: "Poster" } & Pick<
  Types.Poster,
  "id" | "title" | "abstract" | "description" | "pdflink"
> & {
    readonly speakers: ReadonlyArray<
      { readonly __typename?: "Speaker" } & SpeakerInfoFragment
    >;
  };

export const PosterListItemFragmentDoc = gql`
  fragment PosterListItem on Poster {
    id
    title
    abstract
    description
    pdflink
    speakers {
      ...SpeakerInfo
    }
  }
  ${SpeakerInfoFragmentDoc}
`;
export const PosterListItemDocument = gql`
  query PosterListItem($id: ID!) {
    poster(id: $id) {
      ...PosterListItem
    }
  }
  ${PosterListItemFragmentDoc}
`;

/**
 * __usePosterListItemQuery__
 *
 * To run a query within a React component, call `usePosterListItemQuery` and pass it any options that fit your needs.
 * When your component renders, `usePosterListItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePosterListItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePosterListItemQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PosterListItemQuery,
    PosterListItemQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PosterListItemQuery,
    PosterListItemQueryVariables
  >(PosterListItemDocument, baseOptions);
}
export function usePosterListItemLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PosterListItemQuery,
    PosterListItemQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PosterListItemQuery,
    PosterListItemQueryVariables
  >(PosterListItemDocument, baseOptions);
}
export type PosterListItemQueryHookResult = ReturnType<
  typeof usePosterListItemQuery
>;
export type PosterListItemLazyQueryHookResult = ReturnType<
  typeof usePosterListItemLazyQuery
>;
export type PosterListItemQueryResult = ApolloReactCommon.QueryResult<
  PosterListItemQuery,
  PosterListItemQueryVariables
>;
