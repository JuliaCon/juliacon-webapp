import React from "react";
import { useTalkOverviewQuery } from "./TalkOverview.generated";
import { VSpace } from "../layout";
import { css } from "emotion";
import { TimeRangeFormatted } from "../date";

export interface TalkOverviewProps {
  children?: never;
  id: string;
}

export const TalkOverview: React.FC<TalkOverviewProps> = ({ id }) => {
  const { data, loading, error } = useTalkOverviewQuery({ variables: { id } });
  if (error) throw error;
  if (loading) return <p>Loading...</p>;

  if (!data || !data.talk) {
    return <p>Oh no! We couldn't load this talk right now.</p>;
  }

  const {
    title,
    abstract,
    room,
    type,
    speakers,
    startTime,
    endTime,
  } = data.talk;
  return (
    <div
      className={css`
        padding: 0.5rem;
      `}
    >
      <h4
        className={css`
          font-weight: bold;
        `}
      >
        {title}
      </h4>
      <p>
        <TimeRangeFormatted start={startTime} end={endTime} />
      </p>
      <VSpace />
      <p>{abstract}</p>
      <VSpace />
      <div>
        {speakers.map((speaker, index) => (
          <span key={index}>{speaker.name}</span>
        ))}
      </div>
      <p>
        {type} {room?.name}
      </p>
    </div>
  );
};
