import { css } from "emotion";
import React from "react";
import { MinisymposiumData } from "../../data/talk";
import { ExternalLink } from "../content";

export const MinisymposiumDetails = ({ data }: { data: MinisymposiumData }) => {
  return (
    <div
      className={css`
        padding: 1rem 2rem 1rem 3rem;
        border-left: 0.5rem solid var(--julia-purple);
      `}
    >
      <p
        className={css`
          color: #666;
        `}
      >
        During the conference, the minisymposium coordinator will present talks
        in order and facilitate discussion on Discord. The individual talks are
        also available below.
      </p>
      <ul
        className={css`
          list-style-type: disc;
        `}
      >
        {data.talks.map((t) => (
          <li
            key={t.title}
            className={css`
              margin: 1rem 0;
            `}
          >
            <ExternalLink href={`https://youtu.be/${t.videoCode}`}>
              {t.title}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
