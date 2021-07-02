import * as React from "react";
import { SpeakerOverviewData } from "../../data/speaker";
import { interleaveMap } from "../../utils/array";
import { arrayToFragment } from "../../utils/react";
import { Link } from "../core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { HSpace } from "../layout";

export const SpeakerListInline = ({
  speakers,
}: {
  speakers: ReadonlyArray<SpeakerOverviewData>;
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
  return (
    <p>
      <FontAwesomeIcon icon={faUsers} fixedWidth />
      <HSpace width={"0.5rem"} />
      {arrayToFragment(speakersRendered)}
    </p>
  );
};
