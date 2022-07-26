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
            We have{" "}
            <ExternalLink href="https://boards.greenhouse.io/relationalai/jobs/4225730004">
              a job posting available
            </ExternalLink>{" "}
            for anyone interested in working with us on our integration with the
            Julia language and package ecosystem. Other job openings can be
            found{" "}
            <ExternalLink href="https://www.relational.ai/careers">
              here{" "}
            </ExternalLink>
            .
          </p>
        </div>
        <div>
          <TextHeading level={"h3"}>Beacon Biosignals</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
            Want to build open-source tools for distributed DSP/ML (Julia/K8s/Arrow/more)? 
            What about robust data-intensive products that massively accelerate 
            the precision medicine development for various neurological 
            conditions (Typescript/PostgreSQL/Metabase/more)?
            Want to work at a fast-paced startup that executes world-class 
            neuroscience atop a strong engineering culture? 
            Come join Beacon's Platform team to help us engineer the 
            future of brain health analytics! For more info, visit{" "}
              <ExternalLink
                href="
              https://beacon.bio/careers"
              >
                beacon.bio/careers
              </ExternalLink>
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <TextHeading level={"h3"}>Invenia</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
              Invenia is a machine learning lab based in Cambridge, UK and
              Winnipeg, Manitoba. We’re using Julia to optimise complex systems.
              For more information about Invenia, please visit{" "}
              <ExternalLink
                href="
              https://www.invenia.ca/"
              >
                invenia.ca
              </ExternalLink>
              . We are currently hiring Developers and Researchers with a wide
              range of expertise, including machine learning, data science,
              power systems, and research software engineering. For details
              about current opportunities available, please visit{" "}
              <ExternalLink href="https://jobs.lever.co/invenia">
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
          <TextHeading level={"h3"}>ASML</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>ASML gives the world's leading chipmakers the power to mass produce patterns on silicon. Our tailor made machines can image billions of structures in a few seconds with an accuracy of a few silicon atoms. To print microchips that are smaller, faster and more energy-efficient, the demands on these systems go beyond hardware. Software can bring our machines to the next level, and therefore software design is vital for our evolution. We use traditional and modern languages to build very complex software scripts, such as: C++, C#, Java, Python, JavaScript and Julia.</p>
            <p><a href="https://www.asml.com/en/careers/find-your-job/2/3/0/c-software-engineers-metrology-req23063">C++ Software Engineers - Metrology</a>: Learn more about the C++ Software Engineers - Metrology position in Veldhoven, Netherlands at ASML or check out other open jobs at ASML in Research & development.</p>
  
            <p><a href="https://www.asml.com/en/careers/find-your-job/4/2/0/patterningimaging-control-engineer--product-realization-req42018">Patterning/Imaging Control Engineer – Product Realization</a>: Learn more about the Patterning/Imaging Control Engineer – Product Realization position in Veldhoven, Netherlands at ASML.</p>
            If you are not looking for a new opportunity right now, but want to stay connected and learn about Software at ASML. Join the <a href = "https://www.linkedin.com/groups/8679460/">ASML Software and AI community</a>.
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
          <TextHeading level={"h3"}>Community</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p><ul>
              <li><ExternalLink href = "https://discourse.julialang.org/t/jobs-at-nersc/84840"> NERSC is hiring postdocs and HPC engineers </ExternalLink></li>
             </ul></p>
          </VSpaceBetween>
        </div>
      </VSpaceBetween>
    </Page>
  );
};

export default JobsPage;
