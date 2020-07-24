import { DISCORD_BASE_URL } from "./config";

export async function getDiscordUser({
  token,
}: {
  token: string;
}): Promise<DiscordUser> {
  const url = DISCORD_BASE_URL + "/users/@me";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // For debug only, REMOVE THIS
  console.log(`me:`, await response.json());

  // Returns 201 if the member was added, or 204 is the member was already in
  // the server.
  if (response.status !== 200) {
    const message =
      `Unexpected status code returned from Discord while loading user: ` +
      `${response.status} ${response.statusText}`;
    console.error(message);
    throw new Error(message);
  }

  const user: DiscordUser = await response.json();
  return user;
}

// https://discord.com/developers/docs/resources/user
interface DiscordUser {
  id: string;
  username: string;
  // ... other stuff ...
}
