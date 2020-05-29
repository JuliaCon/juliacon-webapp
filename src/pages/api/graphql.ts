import { apolloServer } from "../../apollo-server/server";

export default apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};
