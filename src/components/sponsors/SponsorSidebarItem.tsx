import * as React from "react";
import { css, cx } from "emotion";

// A sponsor in the sidebar

export const SponsorSidebarItem = (sponsor: {
  sponsor: {
    sponsorName: string;
    moreInfoURL: string;
    logoURL: string;
    tier: string;
  };
}) => {
  const sponsorObj = sponsor.sponsor;

  const imgStyle = cx(
    css`
      max-width: 150px;
      max-height: 40px;
      overflow: hidden;
      border: 0;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 1rem;
      display: block;
      width: auto;
    `,
    sponsorObj.tier === "Gold" &&
      css`
        max-width: 200px;
        max-height: 100px;
      `,
    sponsorObj.tier === "Silver" &&
      css`
        max-width: 150px;
        max-height: 70px;
      `,
    sponsorObj.tier === "Media Partner" &&
      css`
        max-height: 50px;
        max-width: 100px;
      `
  );

  return (
    <img
      src={sponsorObj.logoURL}
      alt={sponsorObj.sponsorName}
      className={imgStyle}
    />
  );
};
