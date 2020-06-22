import {
  DISCORD_BASE_URL,
  DISCORD_OAUTH_SCOPE,
  getDiscordOauthClientId,
  getDiscordOauthRedirectUrl,
} from "./config";

/**
 * Get the URL to redirect users to for OAuth.
 */
export function getDiscordRedirectUrl({ state = "" }: { state?: string } = {}) {
  return (
    DISCORD_BASE_URL +
    "/oauth2/authorize" +
    `?response_type=code` +
    `&scope=${encodeURIComponent(DISCORD_OAUTH_SCOPE)}` +
    `&client_id=${encodeURIComponent(getDiscordOauthClientId())}` +
    `&redirect_uri=${encodeURIComponent(getDiscordOauthRedirectUrl())}` +
    (state && `&state=${encodeURIComponent(state)}`)
  );
}
