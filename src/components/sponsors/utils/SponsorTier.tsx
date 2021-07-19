import { SponsorData } from "./Sponsor";

import sponsorsData from "../../../../data/sponsors.json";

export enum SponsorTier {
  Platinum = "Platinum",
  Gold = "Gold",
  Silver = "Silver",
  MediaPartner = "Media Partner",
  FiscalSponsor = "Fiscal Sponsor",
}

export function sponsorTier(sponsor: SponsorData) {
  switch (sponsor.tier) {
    case "Platinum":
      return SponsorTier.Platinum;
    case "Gold":
      return SponsorTier.Gold;
    case "Silver":
      return SponsorTier.Silver;
    case "Media Partner":
      return SponsorTier.MediaPartner;
    case "Fiscal Sponsor":
      return SponsorTier.FiscalSponsor;
    default:
      throw new Error(`Unknown sponsor tier: ${sponsor.tier}`);
  }
}

export function getSponsorsByTier(tier: SponsorTier) {
  return sponsorsData.filter((s) => sponsorTier(s) === tier);
}

export function sponsorTierColor(tier: SponsorTier) {
  switch (tier) {
    case SponsorTier.Platinum:
      return "#e5e4e2";
    case SponsorTier.Gold:
      return "gold";
    case SponsorTier.Silver:
      return "silver";
    case SponsorTier.MediaPartner:
      return "#389826";
    case SponsorTier.FiscalSponsor:
      return "#4063d8";
  }
}
