import { NextPage } from "next";
import React, { useState } from "react";

import ScheduleViz from "../components/vega/ScheduleViz";
import WordCloudViz from "../components/vega/WordCloudViz";
import { Page } from "../components/site";
import { Center, VSpace } from "../components/layout";
import { PageHeading } from "../components/page";

const VizPage: NextPage = () => {
  const [schedHoverID, setSchedHoverID] = useState(null);
  const [wcHoverIDs, setWcHoverIDs] = useState([]);

  return (
    <Page title={"Explore Talks"} hideSponsorSidebar>
      <PageHeading>Explore Talks</PageHeading>
      <VSpace />
      <Center>
        <p>
          JuliaCon 2021 talks by time and virtual room, or topic - hover over a
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
