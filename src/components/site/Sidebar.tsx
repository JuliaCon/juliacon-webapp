import * as React from "react";
import { css } from "emotion";
import sponsors from "../../../data/sponsors.json";
import { SponsorSidebarItem } from "../SponsorSidebarItem";

export const Sidebar = () => {
  const goldSponsors = sponsors.filter((sponsor) => sponsor.tier === "Gold");
  const silverSponsors = sponsors.filter(
    (sponsor) => sponsor.tier === "Silver"
  );
  const mediaPartners = sponsors.filter(
    (sponsor) => sponsor.tier === "Media Partner"
  );
  return (
    <div className={"sidebar"}>
      <h2
        className={css`
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          display: block !important;
          width: 100%;
        `}
      >
        Gold sponsors
      </h2>
      <br />
      {goldSponsors.map((sponsor) => (
        <SponsorSidebarItem sponsor={sponsor} />
      ))}

      <p
        className={css`
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          display: block !important;
          width: 100%;
        `}
      >
        Silver sponsors
      </p>
      {silverSponsors.map((sponsor) => (
        <SponsorSidebarItem sponsor={sponsor} />
      ))}
      <p
        className={css`
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          display: block !important;
          width: 100%;
        `}
      >
        Media partners
      </p>
      {mediaPartners.map((sponsor) => (
        <SponsorSidebarItem sponsor={sponsor} />
      ))}
    </div>
  );
};
