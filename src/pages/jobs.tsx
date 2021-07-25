import * as React from "react";
import { NextPage } from "next";

import { Page } from "../components/site";
import { PageHeading } from "../components/page";
import { VSpace, VSpaceBetween } from "../components/layout";
import { ExternalLink, TextHeading } from "../components/content";
import { Link } from "../components/core";

export const JobsPage: NextPage = () => {
  return (
    <Page title={"Jobs Board"}>
      <PageHeading>Jobs Board</PageHeading>
      <VSpace />
      <VSpaceBetween space={"2rem"}>
        <div>
          <TextHeading level={"h3"}>Julia Computing</TextHeading>
          <VSpace height={"0.5rem"} />
          <p>
              Apply for jobs <ExternalLink href={"https://juliacomputing.com/jobs"}> here. </ExternalLink>
          </p>
        </div>
        <div>
          <TextHeading level={"h3"}>Relational AI</TextHeading>
          <VSpace height={"0.5rem"} />
          <p>
          </p>
        </div>
        <div>
          <TextHeading level={"h3"}>Pumas AI</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>QuEra Computing</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>King Abdullah University of Science and Technology (KAUST)</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>DataChef</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
            </p>
          </VSpaceBetween>
        </div>
      </VSpaceBetween>
    </Page>
  );
};

export default JobsPage;
