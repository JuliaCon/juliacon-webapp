import React from "react";
import { NextPage } from "next";

import { getClosestConferenceDay } from "../../components/date";
import { useRouter } from "next/router";

const Agenda: NextPage = () => {
  const day = getClosestConferenceDay();
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/agenda/[day]", `/agenda/${day}`);
  });
  return null;
};

export default Agenda;

Agenda.getInitialProps = async ({ res }) => {
  // Normally, the user will make an HTTP request to / and then we can just
  // return an HTTP 302 to redirect them to the appropriate page (instead of
  // loading the page **then** getting a redirect, which negates the benefits
  // of SSR).
  if (!res) return {};
  const day = getClosestConferenceDay();
  res.writeHead(
    302, // Found (non-permanent redirect),
    { Location: `/agenda/${day}` }
  );
  res.end();
};
