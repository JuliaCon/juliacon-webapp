import { NextApiHandler } from "next";
import { getDiscordRedirectUrl } from "../../../server/discord";
import { DiscordOAuthState } from "./auth";

const DiscordJoinApiHandler: NextApiHandler = async (req, res) => {
  const { eventbriteCode } = req.body;
  if (!eventbriteCode || typeof eventbriteCode !== "string") {
    res.status(400);
    res.write("Could not get Eventbrite confirmation code!");
    return res.end();
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
