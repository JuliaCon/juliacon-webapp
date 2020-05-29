import React from "react";
import { useAllTalks } from "../apollo/queries";

export const Talks: React.FC = () => {
  const res = useAllTalks();
  return <pre>{JSON.stringify(res, null, 1)}</pre>;
};
