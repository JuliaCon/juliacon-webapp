import React from "react";
import { css } from "emotion";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faCompass } from "@fortawesome/free-solid-svg-icons/faCompass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { HSpace, VSpace } from "../layout";
import { SpeakerListInline } from "../speaker";
import { TimeRangeFormatted } from "../date";
import { TalkBylineFragment } from "./TalkByline.generated";

export interface TalkBylineProps {
  talk: TalkBylineFragment;
  vertical?: boolean;
}

export const TalkByline = ({ talk, vertical = false }: TalkBylineProps) => {
  const spacer = () => (vertical ? <VSpace height={"0.5rem"} /> : <HSpace />);
  return (
    <div
      className={css`
        display: flex;
        flex-flow: ${vertical ? "column nowrap" : "row wrap"};
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: row wrap;
        `}
      >
        <SpeakerListInline speakers={talk.speakers} />
      </div>
      {spacer()}
      <div
        className={css`
          display: flex;
          flex-flow: row nowrap;
        `}
      >
        <FontAwesomeIcon icon={faClock} fixedWidth />
        <HSpace width={"0.5rem"} />
        <TimeRangeFormatted start={talk.startTime} end={talk.endTime} />
      </div>
      {spacer()}
      <div
        className={css`
          color: ${talk.room.color || "#444444"};
          display: flex;
        `}
      >
        <FontAwesomeIcon icon={faCompass} fixedWidth />
        <HSpace width={"0.5rem"} />
        <span>{talk.room.name}</span>
      </div>
    </div>
  );
};
