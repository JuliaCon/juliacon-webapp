import * as React from "react";
import { css } from "emotion";

import { Time, TimeRangeFormatted } from "../date";
import { VSpace } from "../layout";
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

  const { title, abstract, startTime, endTime } = data.talk;

  const commonStyle = !noTopBorder && `border-top: 1px solid #ccc;`;

  return (
    <>
      <div
        className={css`
          ${commonStyle};
          border-right: 1px solid #ccc;
          padding: 1rem;
        `}
      >
        <p>
          <Time time={startTime} />
        </p>
      </div>
      <div
        className={css`
          ${commonStyle};
          padding: 1rem;
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
        <p
          className={css`
            font-size: 0.85em;
            color: #333333;
          `}
        >
          <TimeRangeFormatted start={startTime} end={endTime} />
        </p>
        <VSpace />
        <p>{abstract}</p>
      </div>
    </>
  );
};
