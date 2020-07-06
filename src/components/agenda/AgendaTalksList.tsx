import React from "react";
import { ConferenceDay } from "../../const";
import { useAgendaTalksListQuery } from "./AgendaTalksList.generated";
import { AgendaTalksListItem } from "./AgendaTalksListItem";

export interface AgendaTalksListProps {
  children?: never;
  conferenceDay: ConferenceDay;
  zoneOffset: number;
}
export const AgendaTalksList: React.FC<AgendaTalksListProps> = ({
  conferenceDay,
  zoneOffset,
}) => {
  const { data, error, loading, refetch } = useAgendaTalksListQuery({
    variables: { conferenceDay, zoneOffset },
  });

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  const talks = data?.talks;
  if (!talks) return <p>Failed to load talks!</p>;

  // Always refetch data whenever a property changes
  // For some reason the list does not update when
  // zoneOffset is set to one of its previous values
  // if this line is not included
  refetch();

  return (
    <div>
      {talks.map((talk, index) => (
        <AgendaTalksListItem
          talkId={talk.id}
          key={talk.id}
          noTopBorder={index === 0}
        />
      ))}
    </div>
  );
};
