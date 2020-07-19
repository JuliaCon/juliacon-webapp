import { Center, VSpace } from "../layout";
import React from "react";
import { Link } from "../core";

// TODO: This should change to reflect whether or not the conference has not
//    started/has ended/talks are over for the day/there is a scheduled break
export const LiveTalksPlaceholder = () => {
  return (
    <Center>
      <p>No talks are happening right now.</p>
      <VSpace />
      <p>
        See the <Link href={"/agenda"}>conference agenda</Link> for the full
        schedule.
      </p>
    </Center>
  );
};
