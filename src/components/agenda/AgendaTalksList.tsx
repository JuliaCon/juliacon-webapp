import React from "react";
import { ConferenceDay } from "../../const";
import { TalkOverview } from "../talk";
import { useAgendaTalksListQuery } from "./AgendaTalksList.generated";

export interface AgendaTalksListProps {
  children?: never;
  conferenceDay: ConferenceDay;
}
export const AgendaTalksList: React.FC<AgendaTalksListProps> = ({
  conferenceDay,
}) => {
  const { data, error, loading } = useAgendaTalksListQuery({
    variables: { conferenceDay },
  });
  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  const talks = data?.talks;
  if (!talks) return <p>Failed to load talks!</p>;

  return (
    <div>
      {talks.map((talk) => (
        <TalkOverview id={talk.id} key={talk.id} />
      ))}
    </div>
  );
};
