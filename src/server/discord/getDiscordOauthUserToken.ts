import querystring from "querystring";
import {
  DISCORD_OAUTH_SCOPE,
  getDiscordOauthClientId,
  getDiscordOauthClientSecret,
  getDiscordOauthRedirectUrl,
} from "./config";

export async function getDiscordOauthUserToken({ code }: { code: string }) {
  // Body must be form encoded
  const body = querystring.encode({
    client_id: getDiscordOauthClientId(),
    client_secret: getDiscordOauthClientSecret(),
    redirect_uri: getDiscordOauthRedirectUrl(),
    grant_type: "authorization_code",
    scope: DISCORD_OAUTH_SCOPE,
    code,
  });
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const result: AccessTokenResponse = await response.json();
  return result.access_token;
}

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
