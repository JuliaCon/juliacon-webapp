import * as React from "react";
import { css } from "emotion";
import { SpeakerDetailsData } from "../../data/speaker";
import { AgendaTalksListItem } from "../agenda/AgendaTalksListItem";
import { HSpace, VSpace } from "../layout";
import { StyledMarkdown } from "../core";

export const SpeakerDetails = ({
  speaker,
}: {
  speaker: SpeakerDetailsData;
}) => {
  const { biography, talks } = speaker;

  return (
    <div>
      <SpeakerDetailsHeading speaker={speaker} />
      <VSpace />
      {biography && <StyledMarkdown source={biography} />}
      <VSpace />
      <h4
        className={css`
          font-weight: bold;
          font-size: 1rem;
          padding-bottom: 10px;
        `}
      >
        Talks:
      </h4>
      <div>
        {talks.map((talk, index) => (
          <AgendaTalksListItem
            talk={talk}
            key={talk.id}
            noTopBorder={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

const SpeakerDetailsHeading = ({
  speaker,
}: {
  speaker: SpeakerDetailsData;
}) => {
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
