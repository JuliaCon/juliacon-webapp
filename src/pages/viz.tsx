import { NextPage } from "next";
import React, { useState } from "react";

import ScheduleViz from "../components/vega/ScheduleViz";
import WordCloudViz from "../components/vega/WordCloudViz";
import { Page } from "../components/site";

const VizPage: NextPage = () => {
  const [schedHoverID, setSchedHoverID] = useState(null);
  const [wcHoverIDs, setWcHoverIDs] = useState([]);

  return (
    <Page>
      <h1>What's Everyone Talking About at JuliaCon?</h1>

      <p>
        JuliaCon 2020 talks by time and virtual room, or topic - hover over a
        point or word to explore!
      </p>

      <div className="my5">
        <ScheduleViz wcHover={wcHoverIDs} setHover={setSchedHoverID} />
      </div>
      <br />
      <div className="my5">
        <WordCloudViz schedHover={schedHoverID} setHover={setWcHoverIDs} />
      </div>
    </Page>
  );
};

export default VizPage;
