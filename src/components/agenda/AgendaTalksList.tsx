import React from "react";
import { TalkOverviewData } from "../../data/talk";
import { AgendaTalksListItem } from "./AgendaTalksListItem";

export interface AgendaTalksListProps {
  talks: ReadonlyArray<TalkOverviewData>;
}

export const AgendaTalksList = ({ talks }: AgendaTalksListProps) => {
  return (
    <div>
      {talks.map((talk, index) => (
        <AgendaTalksListItem
          talk={talk}
          key={talk.id}
          noTopBorder={index === 0}
        />
      ))}
    </div>
  );
};
