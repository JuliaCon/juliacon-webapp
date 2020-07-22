import React from "react";
import { PosterListItem } from "./PosterListItem";
import { css } from "emotion";

export const PosterList = () => {
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
      <PosterListItem posterId="RGT8RF" />
    </div>
  );
};
