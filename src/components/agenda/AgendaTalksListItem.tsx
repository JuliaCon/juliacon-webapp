import * as React from "react";
import { css, cx } from "emotion";

import { desktopOnly, mobileOnly } from "../../utils/css";
import { Link, StyledMarkdown } from "../core";
import { Time, TimeRangeFormatted } from "../date";
import { VSpace } from "../layout";
import { SpeakerListInline } from "../speaker";

import { useAgendaTalksListItemQuery } from "./AgendaTalksListItem.generated";

export const AgendaTalksListItem = ({
  talkId,
  noTopBorder,
}: {
  talkId: string;
  noTopBorder?: boolean;
}) => {
  const { data, error, loading } = useAgendaTalksListItemQuery({
    variables: { id: talkId },
  });

  if (error) throw error;
  if (loading) return <p>Loading...</p>;
  if (!data?.talk) return <p>Couldn't load this talk...</p>;

  const { title, abstract, startTime, endTime, speakers } = data.talk;

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
          <Time time={startTime} />
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
        <Link href="/talk/[id]" as={`/talk/${talkId}`}>
          <h4
            className={css`
              font-family: "Patua One", sans-serif;
              font-size: 1.25rem;
            `}
          >
            {title}
          </h4>
        </Link>
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
            <TimeRangeFormatted start={startTime} end={endTime} />
          </p>
          <span
            className={css`
              margin-left: 0.5em;
              margin-right: 0.5em;
            `}
          >
            &bull;
          </span>
          <SpeakerListInline speakers={speakers} />
        </div>
        <VSpace />
        {abstract && <StyledMarkdown source={abstract} />}
      </div>
    </div>
  );
};
