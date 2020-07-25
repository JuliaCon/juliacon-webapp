import { SponsorData, SponsorTier, sponsorTier } from "./utils";
import React from "react";
import { css, cx } from "emotion";
import { MaybeExternalLink, TextHeading } from "../content";
import { VSpace } from "../layout";

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
            tier === SponsorTier.Silver &&
              css`
                max-width: 150px;
              `,
            tier === SponsorTier.Gold &&
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
            <p>{sponsor.blurb}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};
