import { getenvX } from "../../utils/getenv";

export const DISCORD_BASE_URL = "https://discord.com/api";
export const DISCORD_OAUTH_SCOPE = `identify guilds.join`;

// These environment variables are taken from runtime, so they're not just
// constants.
export const getDiscordGuildId = () => getenvX("DISCORD_GUILD_ID");
export const getDiscordOauthRedirectUrl = () =>
  getenvX("DISCORD_OAUTH_REDIRECT_URL");
export const getDiscordOauthClientId = () => getenvX("DISCORD_OAUTH_CLIENT_ID");
export const getDiscordOauthClientSecret = () =>
  getenvX("DISCORD_OAUTH_CLIENT_SECRET");
export const getDiscordBotToken = () => getenvX("DISCORD_BOT_TOKEN");
