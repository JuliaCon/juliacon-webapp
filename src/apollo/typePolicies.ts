import { TypePolicies } from "@apollo/client";

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      // We need to tell Apollo that these fields map directly to data that we
      // likely already have.
      talk: (existing, { args, toReference }) => {
        return existing || toReference({ __typename: "Talk", id: args?.id });
      },
    },
  },
};
