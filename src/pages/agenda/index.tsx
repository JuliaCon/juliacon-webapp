import React from "react";
import { GetServerSideProps, NextPage } from "next";

import { getClosestConferenceDay } from "../../components/date";
import { useRouter } from "next/router";

const Agenda: NextPage = () => {
  const day = getClosestConferenceDay();
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/agenda/[day]", `/agenda/${day}`);
  });
  return <noscript>Please enable JavaScript.</noscript>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: `/agenda/${getClosestConferenceDay()}`,
    },
  };
};

export default Agenda;
