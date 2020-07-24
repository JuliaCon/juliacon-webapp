import * as React from "react";
import { css, cx } from "emotion";
import sponsors from "../../../data/sponsors.json";
import { SponsorSidebarItem } from "../SponsorSidebarItem";
import { VSpace } from "../layout";
import { mobileOnly } from "../../utils/css";
export const Sidebar = () => {
  const goldSponsors = sponsors.filter((sponsor) => sponsor.tier === "Gold");
  const silverSponsors = sponsors.filter(
    (sponsor) => sponsor.tier === "Silver"
  );
  const mediaPartners = sponsors.filter(
    (sponsor) => sponsor.tier === "Media Partner"
  );
  return (
    <div
      className={cx(
        css`
          background-color: #f6f6f6;
          align-self: stretch;
          justify-self: stretch;
          padding: 1rem;
          flex: 1;
          max-width: 400px;
        `,
        mobileOnly(
          css`
            max-width: 100%;
          `
        )
      )}
    >
      <div
        className={css`
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
        `}
      >
        <div>
          <h2
            className={css`
              font-size: 1.5rem;
              font-weight: bold;
              text-align: center;
              border-bottom: 1px solid #ccc;
              display: block;
              width: 100%;
            `}
          >
            Gold sponsors
          </h2>
          <VSpace />
          {goldSponsors.map((sponsor) => (
            <SponsorSidebarItem sponsor={sponsor} />
          ))}

          <VSpace height={"3rem"} />

          <h2
            className={css`
              font-size: 1.5rem;
              font-weight: bold;
              text-align: center;
              border-bottom: 1px solid #ccc;

              width: 100%;
            `}
          >
            Silver sponsors
          </h2>
          <VSpace />
          {silverSponsors.map((sponsor) => (
            <SponsorSidebarItem sponsor={sponsor} />
          ))}

          <VSpace height={"3rem"} />

          <h2
            className={css`
              font-size: 1.5rem;
              font-weight: bold;
              text-align: center;
              border-bottom: 1px solid #ccc;

              display: block;
              width: 100%;
            `}
          >
            Media partners
          </h2>
          <VSpace />
          {mediaPartners.map((sponsor) => (
            <SponsorSidebarItem sponsor={sponsor} />
          ))}
        </div>
      </div>
    </div>
  );
};
