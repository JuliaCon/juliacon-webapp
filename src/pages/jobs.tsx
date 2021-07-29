import * as React from "react";
import { NextPage } from "next";

import { Page } from "../components/site";
import { PageHeading } from "../components/page";
import { VSpace, VSpaceBetween } from "../components/layout";
import { ExternalLink, TextHeading } from "../components/content";

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
            Julia Computing is expanding its team to provide the best possible
            Julia experience to its customers. We are hiring product managers,
            cloud engineers, sales engineers, compiler experts, ML
            practitioners, application developers, at all levels of seniority.
            Check out our jobs page{" "}
            <ExternalLink href={"https://juliacomputing.com/jobs"}>
              {" "}
              here.{" "}
            </ExternalLink>
          </p>
        </div>
        <div>
          <TextHeading level={"h3"}>Relational AI</TextHeading>
          <VSpace height={"0.5rem"} />
          <p>
            Job openings available{" "}
            <ExternalLink href="https://www.relational.ai/careers">
              here{" "}
            </ExternalLink>
            .
          </p>
        </div>
        <div>
          <TextHeading level={"h3"}>Invenia</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
              Invenia is a machine learning lab based in Cambridge, UK and
              Winnipeg, Manitoba. We’re using Julia to optimise complex systems.
              For more information about Invenia, please visit
              https://www.invenia.ca/ We are currently hiring Developers and
              Researchers with a wide range of expertise, including machine
              learning, data science, power systems, and research software
              engineering. For details about current opportunities available,
              please visit{" "}
              <ExternalLink href="joininvenia.com">
                joininvenia.com
              </ExternalLink>
              .
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>Pumas AI</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
              Contact us at careers AT pumas DOT ai. Otherwise, find our Discord
              channel at the conference.
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>QuEra Computing</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
              Check out openings{" "}
              <ExternalLink href="https://jobs.recooty.com/quera-computing">
                {" "}
                here{" "}
              </ExternalLink>
              . For questions contact Thanos Pantazis (tpantazis AT
              quera-computing DOT com)
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>
            King Abdullah University of Science and Technology (KAUST)
          </TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
              We have:
              <ol>
                <li>
                  <ExternalLink href="https://www.kaust.edu.sa/en/about/faculty-positions">
                    Faculty Openings
                  </ExternalLink>{" "}
                </li>
                <li>
                  <ExternalLink href="https://www.kaust.edu.sa/en/about/postdoc-researcher-positions">
                    PostDoc and Research Scientist Openings
                  </ExternalLink>{" "}
                </li>
                <li>
                  <ExternalLink href="https://admissions.kaust.edu.sa/">
                    Student Admissions
                  </ExternalLink>{" "}
                </li>
              </ol>
              If you have questions, reach out to the appropriate e-mail and
              contacts listed on the KAUST website.
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>DataChef</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
              We are hiring{" "}
              <ExternalLink href="https://www.notion.so/Data-Engineer-872d13c58766443d809dce3c6bd3a5af">
                {" "}
                data engineers
              </ExternalLink>
              .
            </p>
          </VSpaceBetween>
        </div>
      </VSpaceBetween>
    </Page>
  );
};

export default JobsPage;
