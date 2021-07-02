import * as React from "react";
import { css, cx } from "emotion";
import { TalkOverviewData } from "../../data/talk";

import { desktopOnly, mobileOnly } from "../../utils/css";
import { Link, StyledMarkdown } from "../core";
import { Time } from "../date";
import { VSpace } from "../layout";

import { TalkByline } from "../talk";

export const AgendaTalksListItem = ({
  talk,
  noTopBorder,
}: {
  talk: TalkOverviewData;
  noTopBorder?: boolean;
}) => {
  const { title, abstract, startTime } = talk;

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
        <Link href="/talk/[id]" as={`/talk/${talk.id}`}>
          <h4
            className={css`
              font-family: "Patua One", sans-serif;
              font-size: 1.25rem;
            `}
          >
            {title}
          </h4>
        </Link>
        <VSpace height={"0.5em"} />
        <TalkByline talk={talk} />
        <VSpace />
        {abstract && <StyledMarkdown source={abstract} />}
      </div>
    </div>
  );
};
