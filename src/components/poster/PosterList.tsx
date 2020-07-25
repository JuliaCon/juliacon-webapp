import React from "react";
import { PosterListItem } from "./PosterListItem";
import { usePosterListQuery } from "./PosterList.generated";

export const PosterList = () => {
  const { data, error, loading } = usePosterListQuery();

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  if (!data?.posters) return <p>Couldn't load the posters </p>;

  const posters = data.posters;

  return (
    <div>
      {posters.map((poster) => (
        <PosterListItem posterId={poster.id} />
      ))}
    </div>
  );
};
