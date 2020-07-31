import * as React from "react";
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";
import { css } from "emotion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";

import { CONFERENCE_DAYS, ConferenceDay, isConferenceDay } from "../../const";
import { MouseoverAction, UnstyledLink } from "../core";
import { now } from "../../utils/time";

interface ConferenceDayPickerProps {
  day: ConferenceDay;
  linkHrefFn: (day: ConferenceDay) => { href: string; as?: string };

  /**
   * A callback that is invoked when the user expresses "intent" to navigate to
   * a previous/subsequent day (e.g., when the user mouses over the selector
   * button).
   *
   * The first argument is the day that the user has expressed intent to
   * navigate to.
   *
   * This should be used to implement data pre-fetching.
   */
  onNavIntent?: (day: ConferenceDay) => void;
}

export const ConferenceDayPicker = ({
  day,
  linkHrefFn,
  onNavIntent,
}: ConferenceDayPickerProps) => {
  // This is somewhat fragile. We might want to just format dates on the server
  // side and always UTC (otherwise, the format will respect the users timezone
  // and dates might wrap: e.g., `new Date("2019-07-26")` is formatted as
  // `Thursday, July 25, 2019` (for me, in Eastern time) because the `Date`
  // is instantiated at midnight UTC, which is 8pm Eastern (on the previous
  // day).
  // The fix here is using parseISO, which will parse the date in the user's
  // timezone, but that seems a bit fragile, especially because everything in
  // Node land is done in UTC while everything in the frontend is done in the
  // browser's timezone.
  const dateFormatted = format(parseISO(day), "EEEE, MMMM d, yyyy", {
    timeZone: "+00:00",
  });

  const arrowStyle = css`
    font-size: 1.5em;

    &:not([href]) {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const index = CONFERENCE_DAYS.indexOf(day);
  if (index === -1) {
    throw new Error(`Got invalid ConferenceDay: ${day}`);
  }

  // We need the manual `| null` here because TypeScript's optimistic indexing
  // assumes `CONFERENCES_DAYS[number]` always returns non-`undefined`
  const prevDay = (CONFERENCE_DAYS[index - 1] || null) as ConferenceDay | null;
  const nextDay = (CONFERENCE_DAYS[index + 1] || null) as ConferenceDay | null;

  const onPrevMouseOver = React.useCallback(() => {
    if (prevDay && onNavIntent) onNavIntent(prevDay);
  }, [prevDay, onNavIntent]);
  const onNextMouseOver = React.useCallback(() => {
    if (nextDay && onNavIntent) onNavIntent(nextDay);
  }, [nextDay, onNavIntent]);

  return (
    <div
      className={css`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      `}
    >
      <MouseoverAction action={onPrevMouseOver}>
        <UnstyledLink
          href={undefined}
          {...(prevDay && linkHrefFn(prevDay))}
          className={arrowStyle}
        >
          <FontAwesomeIcon icon={faCaretLeft} fixedWidth />
        </UnstyledLink>
      </MouseoverAction>
      <div
        className={css`
          text-align: center;
          width: 16em;
        `}
      >
        <p>{dateFormatted}</p>
      </div>
      <MouseoverAction action={onNextMouseOver}>
        <UnstyledLink
          href={undefined}
          {...(nextDay && linkHrefFn(nextDay))}
          className={arrowStyle}
        >
          <FontAwesomeIcon icon={faCaretRight} fixedWidth />
        </UnstyledLink>
      </MouseoverAction>
    </div>
  );
};

export function getClosestConferenceDay(): ConferenceDay {
  const today = format(now(), `yyyy-MM-dd`);

  if (isConferenceDay(today)) {
    return today;
  }

  if (today < CONFERENCE_DAYS[0]) {
    return CONFERENCE_DAYS[0];
  }

  return CONFERENCE_DAYS[CONFERENCE_DAYS.length - 1];
}
