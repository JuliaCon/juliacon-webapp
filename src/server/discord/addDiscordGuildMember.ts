import {
  DISCORD_BASE_URL,
  getDiscordBotToken,
  getDiscordGuildId,
} from "./config";

/**
 * Add a user to a Discord server.
 */
export async function addDiscordGuildMember({
  userId,
  token,
  nick,
}: {
  userId: string;
  token: string;
  nick?: string;
}) {
  const url =
    DISCORD_BASE_URL +
    "/guilds/" +
    encodeURIComponent(getDiscordGuildId()) +
    "/members/" +
    encodeURIComponent(userId);
  const body = JSON.stringify({
    access_token: token,
    nick,
  });

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // NOTE: This endpoint requires that we specify the *bot* credentials
      // using the Authorization header, and pass the user OAuth2 token via the
      // HTTP body
      "Authorization": `Bot ${getDiscordBotToken()}`,
    },
    body,
  });

  // Returns 201 if the member was added, or 204 is the member was already in
  // the server.
  if (response.status !== 201 && response.status !== 204) {
    const message = `Unexpected status code returned from Discord: ${response.status} ${response.statusText}`;
    console.error(message, await response.text());
    throw new Error(message);
  }

  // The API returns the user object as a response, but we don't need that.
  return;
}
