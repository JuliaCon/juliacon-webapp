import * as React from "react";
import { css } from "emotion";

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

  return (
    <div
      className={
        css`
           {
            display: inline;
          }
        ` +
        " " +
        sponsorObj.tier
      }
    >
      <a href={sponsorObj.moreInfoURL}>
        <img
          src={sponsorObj.logoURL}
          alt={sponsorObj.sponsorName}
          className={css`
             {
              max-width: 150px;
              max-height: 40px;
              overflow: hidden;
              border: 0;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 10px;
              display: block;
            }
          `}
        />
      </a>
    </div>
  );
};
