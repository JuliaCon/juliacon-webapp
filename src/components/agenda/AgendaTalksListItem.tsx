import * as React from "react";
import { css, cx } from "emotion";

import { interleaveMap } from "../../utils/array";
import { desktopOnly, mobileOnly } from "../../utils/css";
import { arrayToFragment } from "../../utils/react";
import { Link } from "../core";
import { Time, TimeRangeFormatted } from "../date";
import { VSpace } from "../layout";
import { addMinutes } from "date-fns";

import {
  AgendaTalksListItemQuery,
  useAgendaTalksListItemQuery,
} from "./AgendaTalksListItem.generated";

export const AgendaTalksListItem = ({
  talkId,
  noTopBorder,
  zoneOffset,
}: {
  talkId: string;
  noTopBorder?: boolean;
  zoneOffset: number;
}) => {
  const { data, error, loading } = useAgendaTalksListItemQuery({
    variables: { id: talkId },
  });

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  if (!data?.talk) return <p>Couldn't load this talk...</p>;

  const { title, abstract, startTime, endTime, speakers } = data.talk;

  let startTimeDate = new Date(startTime);
  let offsetedStartTime = addMinutes(new Date(startTime), zoneOffset);
  let offsetedEndTime = addMinutes(new Date(endTime), zoneOffset);

  function rolloverText() {
    // Returns the text that indicates if the
    // time has rolled over into a different getDay
    // due to the timezone offset
    if (
      zoneOffset > 0 &&
      offsetedStartTime.getDay() !== startTimeDate.getDay()
    ) {
      return " The next day";
    }

    if (
      zoneOffset < 0 &&
      offsetedStartTime.getDay() !== startTimeDate.getDay()
    ) {
      return " The previous day";
    }

    return "";
  }

  const commonStyle =
    !noTopBorder &&
    desktopOnly(css`
       {
        border-top: 1px solid #ccc;
      }
    `);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
      `}
    >
      <div
        className={cx(
          css`
            ${commonStyle};
            padding: 1rem;
            width: 8rem;
            border-right: 1px solid #ccc;
            text-align: right;
          `,
          mobileOnly(
            css`
              display: none;
            `
          )
        )}
      >
        <p>
          <Time time={offsetedStartTime} />
          {rolloverText()}
        </p>
      </div>
      <div
        className={css`
          ${commonStyle};
          padding: 1rem;
          overflow: hidden;
          flex: 1;
        `}
      >
        <h4
          className={css`
            font-weight: bold;
          `}
        >
          {title}
        </h4>
        <VSpace height={"0.25em"} />
        <div
          className={css`
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            font-size: 0.85em;
            color: #333333;
          `}
        >
          <p>
            <TimeRangeFormatted
              start={offsetedStartTime.toISOString()}
              end={offsetedEndTime.toISOString()}
            />
          </p>
          <span
            className={css`
              margin-left: 0.5em;
              margin-right: 0.5em;
            `}
          >
            &bull;
          </span>
          <AgendaTalksListItemSpeakers speakers={speakers} />
        </div>
        <VSpace />
        <p>{abstract}</p>
      </div>
    </div>
  );
};

type TalkData = NonNullable<AgendaTalksListItemQuery["talk"]>;
type TalkSpeakers = TalkData["speakers"];
const AgendaTalksListItemSpeakers = ({
  speakers,
}: {
  speakers: TalkSpeakers;
}) => {
  // Interleave the speaker links with commas
  const speakersRendered = interleaveMap(
    speakers,
    (speaker) => (
      <Link
        href={"/speaker/[id]"}
        as={`/speaker/${speaker.id}`}
        key={speaker.id}
      >
        {speaker.name}
      </Link>
    ),
    () => <>, </>
  );
  return <p>{arrayToFragment(speakersRendered)}</p>;
};
