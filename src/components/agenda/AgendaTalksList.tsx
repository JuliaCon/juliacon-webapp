import React, { useEffect } from "react";
import { ConferenceDay } from "../../const";
import { useAgendaTalksListQuery } from "./AgendaTalksList.generated";
import { AgendaTalksListItem } from "./AgendaTalksListItem";
import { Center, VSpace } from "../../components/layout";
import Dropdown from "react-dropdown";

const options = [
  { value: 0, label: "UTC+0" },
  { value: 60, label: "UTC+1" },
  { value: 120, label: "UTC+2" },
  { value: 180, label: "UTC+3" },
];

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

  useEffect(() => {
    console.log("PropChanged");
    console.log(zoneOffset);
    console.log("PostChange");
  });

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  const talks = data?.talks;
  if (!talks) return <p>Failed to load talks!</p>;

  function onChange(option) {
    zoneOffset = option.value;
    refetch({ conferenceDay, zoneOffset });
  }

  const currentOption = options[0];

  return (
    <div>
      <Center>Choose your timezone</Center>
      <VSpace />
      <Dropdown
        options={options}
        onChange={onChange}
        value={currentOption}
        placeholder="Select an option"
      />
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
