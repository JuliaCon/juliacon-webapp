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
          <VSpace height={"0.5rem"} />
          <p>
            JuliaCon is the conference dedicated to the Julia programming
            language. The conference is fully virtual this year and talks run
            from July 28th through July 30th, 2021 with workshops running the
            previous week.
          </p>
        </div>
        <div>
          <TextHeading level={"h3"}>How do I register?</TextHeading>
          <VSpace height={"0.5rem"} />
          <p>
            All of the conference materials are available here for free, but
            registration is required (don't worry, it's free!). You can register
            on the{" "}
            <ExternalLink href={"https://juliacon.org/2021/tickets/"}>
              JuliaCon 2021 site
            </ExternalLink>
            .
          </p>
        </div>
        <div>
          <TextHeading level={"h3"}>How do I attend?</TextHeading>
          <VSpaceBetween space={"0.5rem"} spaceAbove>
            <p>
              You're in the right place! Check out the{" "}
              <Link href={"/agenda"}>conference agenda</Link> to discover
              interesting talks and use the <Link href={"/live"}>live app</Link>{" "}
              to watch talks in real time.
            </p>
            <p>
              Join the{" "}
              <Link href={"/discord/join"}>conference Discord server</Link> to
              engage with other attendees, ask questions to presenters, network,
              and get familiar with the vibrant and welcoming Julia community.
            </p>
          </VSpaceBetween>
        </div>
        <div>
          <VSpaceBetween space={"0.5rem"}>
            <TextHeading level={"h3"}>
              How do I get my conference swag?
            </TextHeading>
            <p>
              T-shirts and mugs are available on the{" "}
              <ExternalLink
                href={"https://www.bonfire.com/store/the-julia-language/"}
              >
                Julia Bonfire store
              </ExternalLink>
              . JuliaCon is also proud to be sponsored by{" "}
              <ExternalLink
                href={"http://stickermule.com/juliacon20?utm_source=juliacon"}
              >
                Sticker Mule
              </ExternalLink>
              ! Head to their site to get 10 Julia stickers for only one 1 Euro
              (plus free shipping!). You can find the Julia Language logo{" "}
              <ExternalLink
                href={
                  "https://github.com/JuliaLang/julia-logo-graphics/blob/master/images/julia-logo-color.png"
                }
              >
                here
              </ExternalLink>
              .
            </p>
          </VSpaceBetween>
        </div>
      </VSpaceBetween>
    </Page>
  );
};

export default IndexPage;
