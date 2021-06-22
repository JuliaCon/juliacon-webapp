import * as React from "react";
import { css, cx } from "emotion";
import sponsors from "../../../data/sponsors.json";
import { SponsorSidebarItem } from "./SponsorSidebarItem";
import { VSpace } from "../layout";
import { mobileOnly } from "../../utils/css";
import { Link } from "../core";
import { getSponsorsByTier, SponsorTier } from "./utils";

export const SponsorSidebar = () => {
  const platinumSponsors = sponsors.filter((sponsor) => sponsor.tier === "Platinum");
  const goldSponsors = sponsors.filter((sponsor) => sponsor.tier === "Gold");
  const silverSponsors = sponsors.filter(
    (sponsor) => sponsor.tier === "Silver"
  );
  const mediaPartners = sponsors.filter(
    (sponsor) => sponsor.tier === "Media Partner"
  );
  return (
    <Link
      href={"/sponsors"}
      className={cx(
        css`
          display: block;
          background-color: #f6f6f6;
          align-self: stretch;
          justify-self: stretch;
          padding: 1rem;
          flex: 1;
          max-width: 400px;
          text-decoration: none;
        `,
        mobileOnly(
          css`
            max-width: 100%;
          `
        )
      )}
    >
      <div>
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
              Platinum sponsors
            </h2>
            <VSpace />
            {platinumSponsors.map((sponsor, i) => (
              <SponsorSidebarItem key={i} sponsor={sponsor} />
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
              Gold sponsors
            </h2>
            <VSpace />
            {goldSponsors.map((sponsor, i) => (
              <SponsorSidebarItem key={i} sponsor={sponsor} />
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
            {silverSponsors.map((sponsor, i) => (
              <SponsorSidebarItem sponsor={sponsor} key={i} />
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
            {mediaPartners.map((sponsor, i) => (
              <SponsorSidebarItem sponsor={sponsor} key={i} />
            ))}
          </div>

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
            Fiscal Sponsor
          </h2>
          <VSpace />
          {getSponsorsByTier(SponsorTier.FiscalSponsor).map((sponsor, i) => (
            <SponsorSidebarItem sponsor={sponsor} key={i} />
          ))}
        </div>
      </div>
    </Link>
  );
};
