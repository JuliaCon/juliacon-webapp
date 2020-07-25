import { SponsorData } from "./Sponsor";

import sponsorsData from "../../../../data/sponsors.json";

export enum SponsorTier {
  Gold = "Gold",
  Silver = "Silver",
  MediaPartner = "Media Partner",
}

export function sponsorTier(sponsor: SponsorData) {
  switch (sponsor.tier) {
    case "Gold":
      return SponsorTier.Gold;
    case "Silver":
      return SponsorTier.Silver;
    case "Media Partner":
      return SponsorTier.MediaPartner;
    default:
      throw new Error(`Unknown sponsor tier: ${sponsor.tier}`);
  }
}

export function getSponsorsByTier(tier: SponsorTier) {
  return sponsorsData.filter((s) => sponsorTier(s) === tier);
}

export function sponsorTierColor(tier: SponsorTier) {
  switch (tier) {
    case SponsorTier.Gold:
      return "gold";
    case SponsorTier.Silver:
      return "silver";
    case SponsorTier.MediaPartner:
      return "#389826";
  }
}
