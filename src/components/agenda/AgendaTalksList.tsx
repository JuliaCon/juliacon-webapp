import React from "react";
import { ConferenceDay } from "../../const";
import { useAgendaTalksListQuery } from "./AgendaTalksList.generated";
import { AgendaTalksListItem } from "./AgendaTalksListItem";
import { css } from "emotion";

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
    <div
      className={css`
        display: grid;
        grid-template-columns: auto 1fr;
      `}
    >
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
