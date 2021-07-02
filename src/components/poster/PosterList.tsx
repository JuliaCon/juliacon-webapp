import React from "react";
import Select from "react-select";

import { PosterData } from "../../data/poster";
import { VSpaceBetween } from "../layout";
import { PosterListItem } from "./PosterListItem";

const selectOptions = [
  {
    label: "All Posters",
    value: null,
  },
  {
    label: "Poster Session One",
    value: "1",
  },
  {
    label: "Poster Session Two",
    value: "2",
  },
];

export const PosterList = ({
  posters: allPosters,
}: {
  posters: ReadonlyArray<PosterData>;
}) => {
  const [day, setDay] = React.useState(selectOptions[0]);
  const posters = React.useMemo(() => {
    if (!allPosters) return [];
    if (!day.value) return allPosters;
    return allPosters.filter((p) => p.session === day.value);
  }, [allPosters, day.value]);

  return (
    <VSpaceBetween space={"1.5rem"}>
      <Select options={selectOptions} value={day} onChange={setDay as any} />
      {posters.map((poster) => (
        <PosterListItem poster={poster} key={poster.id} />
      ))}
    </VSpaceBetween>
  );
};
