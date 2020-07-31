import React from "react";
import { PosterListItem } from "./PosterListItem";
import { usePosterListQuery } from "./PosterList.generated";
import Select from "react-select";
import { PosterDay } from "../../apollo/__generated__/types";
import { VSpaceBetween } from "../layout";

const selectOptions = [
  {
    label: "All Posters",
    value: null,
  },
  {
    label: "Poster Session One",
    value: PosterDay.One,
  },
  {
    label: "Poster Session Two",
    value: PosterDay.Two,
  },
];

export const PosterList = () => {
  const { data, error, loading } = usePosterListQuery();

  const [day, setDay] = React.useState(selectOptions[0]);
  const posters = React.useMemo(() => {
    const allPosters = data?.posters;
    if (!allPosters) return [];
    if (!day.value) return allPosters;
    return allPosters.filter((p) => p.day === day.value);
  }, [data?.posters, day.value]);

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  if (!data?.posters) return <p>Couldn't load the posters </p>;

  return (
    <VSpaceBetween space={"1.5rem"}>
      <Select options={selectOptions} value={day} onChange={setDay as any} />
      {posters.map((poster) => (
        <PosterListItem posterId={poster.id} key={poster.id} />
      ))}
    </VSpaceBetween>
  );
};
