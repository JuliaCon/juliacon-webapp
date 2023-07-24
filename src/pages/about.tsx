import * as React from "react";
import { NextPage } from "next";

import { Page } from "../components/site";
import { PageHeading } from "../components/page";
import { VSpace, VSpaceBetween } from "../components/layout";
import { ExternalLink, TextHeading } from "../components/content";
import { Link } from "../components/core";

export const IndexPage: NextPage = () => {
  return (
    <Page title={"About the Conference"}>
      <PageHeading>About the Conference</PageHeading>
      <VSpace />
      <VSpaceBetween space={"2rem"}>
        <div>
          <TextHeading level={"h3"}>What is JuliaCon?</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
              JuliaCon is the conference dedicated to the Julia programming
              language. The conference is in-person at the Ray and Maria Stata Center, MIT. Talks run
              from July 26th through July 29th, 2023 with workshops running on the 25th. This website is
              the conference web-app, which helps attendees easily access the online streams.
            </p>
            <p>
              This year, JuliaCon is co-located with SciMLCon, JuMP-dev and ASE-60. 
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>How do I register?</TextHeading>
          <VSpace height={"0.5rem"} />
          <p>
            You can register
            on the{" "}
            <ExternalLink href={"https://juliacon.org/2023/tickets/"}>
              JuliaCon 2023 site.
            </ExternalLink>
            .
          </p>
        </div>
      </VSpaceBetween>
    </Page>
  );
};

export default IndexPage;
