import { useArrayChoice } from "../../hooks/useArrayChoice";
import { CONFERENCE_DAYS, ConferenceDay, isConferenceDay } from "../../const";
import { format } from "date-fns";
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
  const dateFormatted = format(new Date(state.value), "EEEE, MMMM d, yyyy");

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
