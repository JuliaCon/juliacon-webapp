import { useArrayChoice } from "../../hooks/useArrayChoice";
import { CONFERENCE_DAYS, ConferenceDay, isConferenceDay } from "../../const";
import { format, parseISO } from "date-fns";
import { css } from "emotion";
import { UnstyledButton } from "../ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import React from "react";

interface ConferenceDayPickerProps {
  state: ReturnType<typeof useConferenceDayPickerState>;
}

export function useConferenceDayPickerState() {
  return useArrayChoice(CONFERENCE_DAYS, () => {
    const day = getClosestConferenceDay();
    return CONFERENCE_DAYS.indexOf(day);
  });
}

export const ConferenceDayPicker = ({ state }: ConferenceDayPickerProps) => {
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
  const dateFormatted = format(parseISO(state.value), "EEEE, MMMM d, yyyy");

  return (
    <div
      className={css`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      `}
    >
      <UnstyledButton
        onClick={state.previous}
        className={css`
          font-size: 1.5em;
        `}
      >
        <FontAwesomeIcon icon={faCaretLeft} fixedWidth />
      </UnstyledButton>
      <div
        className={css`
          text-align: center;
          width: 16em;
        `}
      >
        <p>{dateFormatted}</p>
      </div>
      <UnstyledButton
        onClick={state.next}
        className={css`
          font-size: 1.5em;
        `}
      >
        <FontAwesomeIcon icon={faCaretRight} fixedWidth />
      </UnstyledButton>
    </div>
  );
};

function getClosestConferenceDay(): ConferenceDay {
  const now = new Date();
  const today = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  if (isConferenceDay(today)) {
    return today;
  }

  if (today < CONFERENCE_DAYS[0]) {
    return CONFERENCE_DAYS[0];
  }

  return CONFERENCE_DAYS[CONFERENCE_DAYS.length - 1];
}
