import React from "react";
import { useTalkOverviewQuery } from "./TalkOverview.generated";

export interface TalkOverviewProps {
  children?: never;
  id: string;
}

export const TalkOverview: React.FC<TalkOverviewProps> = ({ id }) => {
  const { data, loading, error } = useTalkOverviewQuery({ variables: { id } });
  if (error) throw error;
  if (loading) return null;

  return <pre>{JSON.stringify(data, null, 1)}</pre>;
};
