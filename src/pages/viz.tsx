import { NextPage } from "next";
import React, { useState } from "react";
import { css } from "emotion";

import ScheduleViz from "../components/vega/ScheduleViz";
import WordCloudViz from "../components/vega/WordCloudViz";
import { Page } from "../components/site";
import { Center, VSpace } from "../components/layout";

const VizPage: NextPage = () => {
  const [schedHoverID, setSchedHoverID] = useState(null);
  const [wcHoverIDs, setWcHoverIDs] = useState([]);

  return (
    <Page>
      <Center>
        <h1
          className={css`
            font-weight: bold;
            font-size: 2rem;
          `}
        >
          What's Everyone Talking About at JuliaCon?
        </h1>
      </Center>

      <VSpace />

      <Center>
        <p>
          JuliaCon 2020 talks by time and virtual room, or topic - hover over a
          point or word to explore!
        </p>
      </Center>

      <VSpace />

      <Center>
        <ScheduleViz wcHover={wcHoverIDs} setHover={setSchedHoverID} />
      </Center>

      <VSpace />

      <Center>
        <WordCloudViz schedHover={schedHoverID} setHover={setWcHoverIDs} />
      </Center>
    </Page>
  );
};

export default VizPage;
