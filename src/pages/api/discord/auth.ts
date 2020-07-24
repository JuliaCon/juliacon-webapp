import { NextApiHandler } from "next";

import * as discord from "../../../server/discord";
import * as eventbrite from "../../../server/eventbrite";

import { DiscordJoinStatus } from "../../discord/join";

export interface DiscordOAuthState {
  eventbriteCode: string;
}
const DiscordAuthHandler: NextApiHandler = async (req, res) => {
  const { code, state: stateString } = req.query;
  if (!code || typeof code !== "string") {
    res.status(400);
    res.end();
    return;
  }

  const state: DiscordOAuthState = JSON.parse(stateString as string);
  const { eventbriteCode } = state;

  const eventbriteOrder = await eventbrite.getEventbriteOrder({
    orderId: eventbriteCode,
  });
  if (!eventbriteOrder) {
    res.status(302);
    res.setHeader(
      "Location",
      `/discord/join?status=${DiscordJoinStatus.InvalidEventbriteCode}`
    );
    return res.end();
  }

  const token = await discord.getDiscordOauthUserToken({ code });
  const user = await discord.getDiscordUser({ token });
  await discord.addDiscordGuildMember({
    userId: user.id,
    token,
    nick: eventbriteOrder.name,
  });

  res.status(302);
  res.setHeader(
    "Location",
    `/discord/join?status=${DiscordJoinStatus.Success}`
  );
  return res.end();
};

export default DiscordAuthHandler;
