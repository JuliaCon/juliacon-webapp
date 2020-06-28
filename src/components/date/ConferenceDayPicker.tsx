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
  onNavIntent?: (day: ConferenceDay, event: React.MouseEvent) => void;
}

export function useConferenceDayPickerState() {
  return useArrayChoice(CONFERENCE_DAYS, () => {
    const day = getClosestConferenceDay();
    return CONFERENCE_DAYS.indexOf(day);
  });
}

export const ConferenceDayPicker = ({
  state,
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
  const dateFormatted = format(parseISO(state.value), "EEEE, MMMM d, yyyy");

  const arrowStyle = css`
    font-size: 1.5em;

    &[disabled] {
      opacity: 0.5;
    }
  `;

  const onPreviousMouseOver = React.useCallback(
    (event: React.MouseEvent) => {
      const previous = CONFERENCE_DAYS[state.index - 1];
      if (!previous) return;
      onNavIntent?.(previous, event);
    },
    [onNavIntent, state.index]
  );

  const onNextMouseOver = React.useCallback(
    (event: React.MouseEvent) => {
      const next = CONFERENCE_DAYS[state.index + 1];
      if (!next) return;
      onNavIntent?.(next, event);
    },
    [onNavIntent, state.index]
  );

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
        disabled={!state.hasPrevious}
        className={arrowStyle}
        onMouseEnter={onPreviousMouseOver}
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
        disabled={!state.hasNext}
        className={arrowStyle}
        onMouseEnter={onNextMouseOver}
      >
        <FontAwesomeIcon icon={faCaretRight} fixedWidth />
      </UnstyledButton>
    </div>
  );
};

function getClosestConferenceDay(): ConferenceDay {
  const now = new Date();
  const today = format(now, `yyyy-MM-dd`);

  if (isConferenceDay(today)) {
    return today;
  }

  if (today < CONFERENCE_DAYS[0]) {
    return CONFERENCE_DAYS[0];
  }

  return CONFERENCE_DAYS[CONFERENCE_DAYS.length - 1];
}
