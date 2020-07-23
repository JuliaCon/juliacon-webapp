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
      <span
        className={css`
          font-size: 1rem;
          font-weight: bold;
        `}
      >
        Gold sponsors
      </span>
      {goldSponsors.map((sponsor) => (
        <SponsorSidebarItem sponsor={sponsor} />
      ))}

      <span
        className={css`
          font-size: 1rem;
          font-weight: bold;
        `}
      >
        Silver sponsors
      </span>
      {silverSponsors.map((sponsor) => (
        <SponsorSidebarItem sponsor={sponsor} />
      ))}
      <span
        className={css`
          font-size: 1rem;
          font-weight: bold;
        `}
      >
        Media partners
      </span>
      {mediaPartners.map((sponsor) => (
        <SponsorSidebarItem sponsor={sponsor} />
      ))}
    </div>
  );
};
