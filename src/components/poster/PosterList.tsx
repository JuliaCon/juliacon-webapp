import React from "react";
import { PosterListItem } from "./PosterListItem";
import { usePosterListQuery } from "./PosterList.generated";
import { css } from "emotion";

export const PosterList = () => {
  const { data, error, loading } = usePosterListQuery();

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  if (!data?.posters) return <p>Couldn't load the posters </p>;

  const posters = data.posters;

  return (
    <div>
      <h2
        className={css`
          font-weight: bold;
          font-size: 2rem;
          padding-bottom: 10px;
          text-align: center;
        `}
      >
        Posters
      </h2>
      {posters.map((poster) => (
        <PosterListItem posterId={poster.id} />
      ))}
    </div>
  );
};
