import { NextPage } from "next";
import { Page } from "../components/site";
import React from "react";
import { PageHeading } from "../components/page";
import { SponsorPageItem } from "../components/sponsors/SponsorPageItem";
import { VSpace, VSpaceBetween } from "../components/layout";
import {
  getSponsorsByTier,
  SponsorData,
  SponsorTier,
  sponsorTierColor,
} from "../components/sponsors/utils";
import { TextHeading } from "../components/content";
import { css } from "emotion";

const SponsorsPage: NextPage = () => {
  return (
    <Page title={"Sponsors"} hideSponsorSidebar>
      <PageHeading>Sponsors</PageHeading>
      <VSpace />
      <SponsorsInner />
    </Page>
  );
};

export default SponsorsPage;

const SponsorsInner = () => {
  const sponsorsRendered = [
    SponsorTier.Platinum,
    SponsorTier.Gold,
    SponsorTier.Silver,
    SponsorTier.MediaPartner,
    SponsorTier.FiscalSponsor,
  ].map((tier, i) => {
    const sponsors = getSponsorsByTier(tier);
    return <SponsorsInnerTier tier={tier} sponsors={sponsors} />;
  });

  return <VSpaceBetween space={"3rem"}>{sponsorsRendered}</VSpaceBetween>;
};

const SponsorsInnerTier = ({
  sponsors,
  tier,
}: {
  sponsors: readonly SponsorData[];
  tier: SponsorTier;
}) => {
  return (
    <div
      className={css`
        border-left: 0.5rem solid ${sponsorTierColor(tier)};
        padding-left: 1rem;
      `}
    >
      <TextHeading level={"h2"}>{tier}</TextHeading>
      <VSpace height={"1rem"} />
      <VSpaceBetween space={"2rem"}>
        {sponsors.map((s, i) => (
          <SponsorPageItem sponsor={s} key={i} />
        ))}
      </VSpaceBetween>
    </div>
  );
};
