import React from "react";
import { NextPage } from "next";

import { withApollo } from "../apollo";
import { Page } from "../components/site";
import sponsors from "../../data/sponsors.json";
import { Sponsor } from "../components/Sponsor";
import { Center, VSpace } from "../components/layout";
import { css } from "emotion";

const Sponsors: NextPage = () => {
  const goldSponsors = sponsors.filter((sponsor) => sponsor.tier === "Gold");
  const silverSponsors = sponsors.filter(
    (sponsor) => sponsor.tier === "Silver"
  );
  const mediaPartners = sponsors.filter(
    (sponsor) => sponsor.tier === "Media Partner"
  );

  return (
    <Page>
      <Center>
        <h1
          className={css`
            font-weight: bold;
            font-size: 2rem;
          `}
        >
          Sponsors
        </h1>
      </Center>
      <h2
        className={css`
          font-size: 1.5rem;
          font-weight: bold;
        `}
      >
        Gold sponsors
      </h2>
      <VSpace />
      {goldSponsors.map((sponsor) => (
        <Sponsor sponsor={sponsor} key={sponsor.sponsorName} />
      ))}
      <h2
        className={css`
          font-size: 1.5rem;
          font-weight: bold;
        `}
      >
        Silver sponsors
      </h2>
      <VSpace />
      {silverSponsors.map((sponsor) => (
        <Sponsor sponsor={sponsor} key={sponsor.sponsorName} />
      ))}
      <h2
        className={css`
          font-size: 1.5rem;
          font-weight: bold;
        `}
      >
        Media partners
      </h2>
      <VSpace />
      {mediaPartners.map((sponsor) => (
        <Sponsor sponsor={sponsor} key={sponsor.sponsorName} />
      ))}
    </Page>
  );
};

export default withApollo()(Sponsors);
