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
          <TextHeading level={"h3"}>Julius Technologies</TextHeading>
          <VSpace height={"0.5rem"} />
          <p>Software Developer - Julius Technologies</p>

          <p><b>Location:</b> Anywhere, 100% remote working. Your working hours need to have some overlap with the day time in the US Eastern time zone. </p>
            <p>Julius Technologies is a New York based startup. We offer a low-code visual graph computing solution that allows firms to create sophisticated, scalable, transparent and compliant data and analytics software, systems and services in a fraction of the time and cost of traditional methods.</p>

            <p><b>Job Description:</b>   We are looking for talented developers at all experience levels. We have multiple openings in the areas of core platform, data science/AI applications, trading/risk management systems and frontend/web UI. Successful candidates will be working with the best developers and researchers in the industry, and join the exciting journey to revolutionize enterprise data and analytics.</p>
            <p><b>Types of Roles:</b> full time, part-time and internship. We offer competitive compensation based on candidates’ experience.</p>

            <p><b>Required Skills/Experiences:</b></p>
            <ul><li>Experience in any major programming languages</li>
              <li>Experience in Jupyter notebook</li>
            <li>College degree in Science/Engineering or college students looking for internships/part time.</li></ul>

            <p><b>Preferred Skills/Experience:</b></p>
              <ul><li>Julia programming experience</li>
                <li>Data science, machine learning experience</li>
                <li>Web front end development</li>
                <li>Containers and cloud computing</li>
                <li>Advanced degree in Science and Engineering</li></ul>
             

            <p><b>Contact: </b> If interested, please email your resume to devjobs@julustech.co</p>
        </div>
        <div>
          <TextHeading level={"h3"}>AWS</TextHeading>
          <VSpace height={"0.5rem"} />
          <p>
            
            <ExternalLink href = "https://www.amazon.jobs/en/jobs/1973253/research-scientist-design-and-simulation">
                Research Scientist, Design and Simulation at the AWS Center for Quantum Computing
            </ExternalLink>{" "}<br>
 
        <ExternalLink href = "https://www.amazon.jobs/en /jobs/1557755/research-scientist-design-tools">
                Research Scientist, Design Tools at the AWS Center for Quantum Computing
          </ExternalLink>{" "}<br>
 
        <ExternalLink href = "https://www.amazon.jobs/en/jobs/2122080/software-development-engineer-design-and-simulation-center-for-quantum-computing">
                Software Development Engineer, Design and Simulation at the AWS Center for Quantum Computing
        </ExternalLink>{" "}<br>
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
            If you are not looking for a new opportunity right now, but want to stay connected and learn about Software at ASML. Join the <a href = "https://www.linkedin.com/groups/8679460/">ASML Software and AI community.</a>
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
              <li><ExternalLink href = "https://discourse.julialang.org/c/jobs/62"> Check out various open Julia roles on Discourse </ExternalLink></li>
             </ul></p>
          </VSpaceBetween>
        </div>
      </VSpaceBetween>
    </Page>
  );
};

export default JobsPage;
