import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const LivePage: NextPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
};

export default LivePage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
