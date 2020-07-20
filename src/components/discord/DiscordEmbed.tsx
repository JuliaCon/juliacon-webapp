import React from "react";

import { Client } from "@widgetbot/embed-api";
import dynamic from "next/dynamic";

const SERVER = "709438882504245358";
const SHARD = "https://e.widgetbot.io";

interface DiscordEmbedProps {
  channel?: string;
  className?: string;
  onAPIReady?: (api: Client) => void;
}
const DiscordEmbedSync: React.FC<DiscordEmbedProps> = ({
  channel,
  className,
  onAPIReady,
}) => {
  const url = React.useMemo(() => {
    let url = `${SHARD}/channels/${SERVER}`;
    if (channel) {
      url += `/${channel}`;
    }
    return url;
  }, [channel]);

  const id = React.useMemo(() => generateUUID(), []);

  const [iframe, setIFrame] = React.useState<HTMLIFrameElement | null>(null);

  const api = React.useMemo(() => {
    if (!iframe) return null;
    return new Client({
      id,
      iframe,
    });
  }, [id, iframe]);

  React.useEffect(() => {
    if (api) {
      onAPIReady?.(api);
    }
  }, [api, onAPIReady]);

  return (
    <iframe
      ref={setIFrame}
      src={url}
      title={"Discord embed"}
      className={className}
    />
  );
};

export const DiscordEmbed = dynamic(async () => DiscordEmbedSync, {
  ssr: false,
});

function generateUUID() {
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); // use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
