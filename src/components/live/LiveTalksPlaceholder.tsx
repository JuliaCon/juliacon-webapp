import { Center, VSpace, VSpaceBetween } from "../layout";
import React from "react";
import { Link } from "../core";
import { useLiveTalksQuery } from "./LiveTalks.generated";
import { getDayString } from "../../utils/time";
import { isBefore, isFuture, isPast, parseISO } from "date-fns";
import { css } from "emotion";
import { Time } from "../date";
import { CONFERENCE_DAYS } from "../../const";

export const LiveTalksPlaceholder = () => {
  const time = React.useMemo(() => new Date(), []);
  const day = getDayString(time);

  const isBeforeConference = isBefore(time, parseISO(CONFERENCE_DAYS[0]));
  const isAfterConference: boolean = true as boolean;

  const { data, error } = useLiveTalksQuery({ variables: { day } });
  if (error) throw error;

  const firstTalk = data?.talks?.[0];
  const dayHasStarted = firstTalk && isPast(new Date(firstTalk.startTime));

  const nextTalks = React.useMemo(() => {
    const talks = data?.talks || [];
    let startTime: Date | null = null;
    let nextTalks: Array<typeof talks[number]> = [];
    for (const talk of talks) {
      const talkTime = new Date(talk.startTime);
      if (!isFuture(talkTime)) continue;
      if (!startTime) startTime = talkTime;
      if (startTime.getTime() === talkTime.getTime()) {
        nextTalks.push(talk);
      }
    }
    return nextTalks;
  }, [data?.talks]);
  const dayHasEnded = nextTalks.length === 0;

  const message = (() => {
    switch (true) {
      case isBeforeConference:
        return "The conference hasn't started yet.";
      case isAfterConference:
        return (
          <>
            The conference is now over. Thank you to everyone who made this
            JuliaCon awesome! Visit{" "}
            <a
              href={
                "https://www.youtube.com/playlist?list=PLP8iPy9hna6Tl2UHTrm4jnIYrLkIcAROR"
              }
            >
              the Julia Language's YouTube
            </a>{" "}
            to watch all of the conference's talks, workshops, and keynotes.
          </>
        );
      case data?.talks?.length === 0:
        return "There are no talks scheduled for today.";
      case dayHasEnded:
        return "Talks have ended for the day.";
      case !dayHasStarted && !dayHasEnded:
        return "Talks haven't yet started for today.";
      case dayHasStarted && !dayHasEnded:
        return "We're on a break. Grab a drink or snack and stay tuned!";
      default:
        return "No talks are happening right now.";
    }
  })();

  const nextTalksIndicator = nextTalks.length ? (
    <>
      <VSpace height={"2rem"} />
      <div
        className={css`
          width: 20rem;

          margin-left: auto;
          border-left: 0.5rem solid var(--julia-purple);
          padding: 0.5rem;
          justify-self: flex-end;
        `}
      >
        <VSpaceBetween space={"0.5rem"}>
          <p>
            Up Next (<Time time={nextTalks[0].startTime} />
            ):
          </p>
          {nextTalks.map((talk) => (
            <p
              key={talk.id}
              className={css`
                padding-left: 1rem;
              `}
            >
              <Link href={"/talk/[id]"} as={`/talk/${talk.id}`}>
                {talk.title}
              </Link>
            </p>
          ))}
        </VSpaceBetween>
      </div>
    </>
  ) : null;

  return (
    <Center>
      <p>{message}</p>
      <VSpace />
      <p>
        See the <Link href={"/agenda"}>conference agenda</Link> for the full
        schedule.
      </p>
      {nextTalksIndicator}
    </Center>
  );
};
