import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css, cx } from "emotion";
import React from "react";
import { ExternalLink, MaybeExternalLink, TextHeading } from "../content";
import { Link, StyledMarkdown } from "../core";
import { VSpace } from "../layout";
import { SponsorData, SponsorTier, sponsorTier } from "./utils";

export const SponsorPageItem = ({ sponsor }: { sponsor: SponsorData }) => {
  const tier = sponsorTier(sponsor);
  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: 200px 1fr;
        grid-gap: 2rem;
        align-items: center;
      `}
    >
      <MaybeExternalLink
        href={sponsor.moreInfoURL}
        className={css`
          justify-self: center;
        `}
      >
        <img
          src={sponsor.logoURL}
          alt={""}
          className={cx(
            css`
              width: 100%;
              height: auto;
              max-width: 100px;
              margin: 0 auto;
            `,
            tier === SponsorTier.Bronze &&
              css`
                max-width: 125px;
              `,
            tier === SponsorTier.Silver &&
              css`
                max-width: 150px;
              `,
            tier === SponsorTier.Gold &&
              css`
                max-width: 175px;
              `,
            tier === SponsorTier.Platinum &&
              css`
                max-width: 200px;
              `
          )}
        />
      </MaybeExternalLink>

      <div>
        <TextHeading level={"h3"}>
          <MaybeExternalLink href={sponsor.moreInfoURL}>
            {sponsor.sponsorName}
          </MaybeExternalLink>
        </TextHeading>
        {sponsor.blurb ? (
          <>
            <VSpace height={"0.5rem"} />
            <StyledMarkdown source={sponsor.blurb} />
          </>
        ) : null}
        {sponsor.chatChannelName ? (
          <>
            <VSpace height={"0.5rem"} />
            <div
              className={css`
                padding-left: 1rem;
              `}
            >
              <ExternalLink
                href={sponsor.chatChannelName}
                className={css`
                  text-decoration: none;
                `}
              >
                <FontAwesomeIcon icon={faComments} />{" "}
                <span
                  className={css`
                    text-decoration: underline;
                  `}
                >
                  {" "}
                  Chat with us!
                </span>
              </ExternalLink>
            </div>
          </>
        ) : null}
        {sponsor.discord ? (
          <>
            <VSpace height={"0.5rem"} />
            <div
              className={css`
                padding-left: 1rem;
              `}
            >
              <ExternalLink
                href={sponsor.discord.url}
                className={css`
                  text-decoration: none;
                `}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
