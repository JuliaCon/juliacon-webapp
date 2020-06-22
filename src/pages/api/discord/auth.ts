import { NextApiHandler } from "next";

import * as discord from "../../../server/discord";
import * as cookie from "cookie";
import { DISCORD_COOKIE } from "../../../const";

const DiscordAuthHandler: NextApiHandler = async (req, res) => {
  const { code } = req.query;
  if (!code || typeof code !== "string") {
    res.status(400);
    res.end();
    return;
  }

  const token = await discord.getDiscordOauthUserToken({ code });
  const user = await discord.getDiscordUser({ token });
  await discord.addDiscordGuildMember({ userId: user.id, token });

  res.status(302);

  // If we set a redirect url in the /api/discord/login login, redirect back
  // to that now. Note that we check to make sure the redirect URL isn't
  // absolute (only to a path on the current site).
  const { state } = req.query;
  if (
    typeof state === "string" &&
    state.startsWith("/") &&
    !state.startsWith("//")
  ) {
    res.setHeader("Location", state);
  } else {
    res.setHeader("Location", "/");
  }

  // Set a cookie so the frontend knows that we don't have to do this dance
  // again.
  res.setHeader("Set-Cookie", cookie.serialize(DISCORD_COOKIE, user.id));

  res.end();
  return;
};

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export default DiscordAuthHandler;
