import React from "react";
import { css } from "emotion";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faCompass } from "@fortawesome/free-solid-svg-icons/faCompass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TalkOverviewData } from "../../data/talk";

import { HSpace } from "../layout";
import { SpeakerListInline } from "../speaker";
import { TimeRangeFormatted } from "../date";

export interface TalkBylineProps {
  talk: TalkOverviewData;
  vertical?: boolean;
}

export const TalkByline = ({ talk, vertical = false }: TalkBylineProps) => {
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
          padding: 0.25rem;
        `}
      >
        <SpeakerListInline speakers={talk.speakers} />
      </div>
      <div
        className={css`
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          padding: 0.25rem;
        `}
      >
        <FontAwesomeIcon icon={faClock} fixedWidth />
        <HSpace width={"0.5rem"} />
        <TimeRangeFormatted start={talk.startTime} end={talk.endTime} />
      </div>
      <div
        className={css`
          color: ${talk.room.color || "#444444"};
          display: flex;
          align-items: center;
          padding: 0.25rem;
        `}
      >
        <FontAwesomeIcon icon={faCompass} fixedWidth />
        <HSpace width={"0.5rem"} />
        <span>{talk.room.name}</span>
      </div>
    </div>
  );
};
