import * as React from "react";
import { css } from "emotion";

import {
  SpeakerDetailsQuery,
  useSpeakerDetailsQuery,
} from "./SpeakerDetails.generated";
import { HSpace, VSpace } from "../layout";

type SpeakerData = NonNullable<SpeakerDetailsQuery["speaker"]>;

export const SpeakerDetails = ({ id }: { id: string }) => {
  const { data, error, loading } = useSpeakerDetailsQuery({
    variables: { id },
  });
  if (error) throw error;
  if (loading) return null;

  const { speaker } = data || {};
  if (!speaker) {
    return <p>Couldn't load this speaker...</p>;
  }

  console.log(speaker);

  return (
    <div>
      <SpeakerDetailsHeading speaker={speaker} />
      <VSpace />
      <p>{speaker.biography}</p>
    </div>
  );
};

const SpeakerDetailsHeading = ({ speaker }: { speaker: SpeakerData }) => {
  const avatar = speaker.avatar ? (
    <>
      <SpeakerAvatar src={speaker.avatar} />
      <HSpace />
    </>
  ) : null;
  return (
    <div
      className={css`
        display: flex;
        align-items: center;
      `}
    >
      {avatar}
      <h2
        className={css`
          font-size: 1.5rem;
        `}
      >
        {speaker.name}
      </h2>
    </div>
  );
};

const SpeakerAvatar = ({ src }: { src: string }) => {
  return (
    <div
      className={css`
        border-radius: 100px;
        overflow: hidden;
        border: 1px solid #ccc;
        height: 4rem;
        width: 4rem;
      `}
    >
      <img
        alt={""}
        role={"presentation"}
        src={src}
        className={css`
          height: 100%;
          width: 100%;
          object-fit: cover;
          overflow: auto;
        `}
      />
    </div>
  );
};
