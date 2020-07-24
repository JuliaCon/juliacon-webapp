import * as React from "react";
import { css, cx } from "emotion";

// A sponsor in the sidebar

export const SponsorSidebarItem = (sponsor: {
  sponsor: {
    sponsorName: string;
    blurb: string;
    moreInfoURL: string;
    videoURL: string;
    chatChannelName: string;
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
        max-width: 300px;
        max-height: 100px;
      `,
    sponsorObj.tier === "Silver" &&
      css`
        max-width: 200px;
        max-height: 70px;
      `,
    sponsorObj.tier === "Media Partner" &&
      css`
        height: 50px;
        max-height: 50px;
        max-width: 150px;
      `
  );

  return (
    <div>
      <a href={sponsorObj.moreInfoURL}>
        <img
          src={sponsorObj.logoURL}
          alt={sponsorObj.sponsorName}
          className={imgStyle}
        />
      </a>
    </div>
  );
};
