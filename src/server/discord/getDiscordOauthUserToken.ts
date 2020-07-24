import querystring from "querystring";
import {
  DISCORD_OAUTH_SCOPE,
  getDiscordOauthClientId,
  getDiscordOauthClientSecret,
  getDiscordOauthRedirectUrl,
} from "./config";
import { nullthrows } from "../../utils/invariant";

export async function getDiscordOauthUserToken({ code }: { code: string }) {
  // Body must be form encoded
  const body = {
    client_id: getDiscordOauthClientId(),
    client_secret: getDiscordOauthClientSecret(),
    redirect_uri: getDiscordOauthRedirectUrl(),
    grant_type: "authorization_code",
    scope: DISCORD_OAUTH_SCOPE,
    code,
  };
  console.log({ body });
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.encode(body),
  });

  if (response.status !== 200) {
    const message =
      `Unexpected status code returned from Discord oauth2/token: ` +
      `${response.status} ${response.statusText}`;
    console.error(message, await response.json());
    throw new Error(message);
  }

  const result: AccessTokenResponse = await response.json();
  return nullthrows(
    result.access_token,
    `Discord did not return a valid access token`
  );
}

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
