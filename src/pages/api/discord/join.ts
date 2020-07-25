import { NextApiHandler } from "next";
import { getDiscordRedirectUrl } from "../../../server/discord";
import { DiscordOAuthState } from "./auth";

const DiscordJoinApiHandler: NextApiHandler = async (req, res) => {
  let eventbriteCode: string = req.body.eventbriteCode;
  if (!eventbriteCode || typeof eventbriteCode !== "string") {
    res.status(400);
    res.write("Could not get Eventbrite confirmation code!");
    return res.end();
  }

  eventbriteCode = eventbriteCode.trim();
  if (eventbriteCode.startsWith("#")) {
    eventbriteCode = eventbriteCode.substring(1);
  }

  const state: DiscordOAuthState = {
    eventbriteCode,
  };
  const url = getDiscordRedirectUrl({
    state: JSON.stringify(state),
  });
  res.writeHead(302, {
    Location: url,
  });
  return res.end();
};

export default DiscordJoinApiHandler;
