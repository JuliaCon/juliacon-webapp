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
