import * as React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const REDIRECT_LOCATION = "/agenda";

export const IndexPage: NextPage = () => {
  // If the frontend ever changes the page to "/", we need to handle that
  // redirect in the frontend.
  const router = useRouter();
  React.useEffect(() => {
    router.replace(REDIRECT_LOCATION);
  });

  return null;
};

export default IndexPage;

IndexPage.getInitialProps = async ({ res }) => {
  // Normally, the user will make an HTTP request to / and then we can just
  // return an HTTP 302 to redirect them to the appropriate page (instead of
  // loading the page **then** getting a redirect, which negates the benefits
  // of SSR).
  if (!res) return;
  res.writeHead(
    302, // Found (non-permanent redirect),
    { Location: REDIRECT_LOCATION }
  );
  res.end();
};
