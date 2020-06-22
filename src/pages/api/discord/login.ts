import { NextApiHandler } from "next";
import { getDiscordRedirectUrl } from "../../../server/discord";

const DiscordAuthHandler: NextApiHandler = async (req, res) => {
  const { redirect } = req.query;
  const url = getDiscordRedirectUrl({
    state: typeof redirect === "string" ? redirect : undefined,
  });
  res.writeHead(302, {
    Location: url,
  });
  res.end();
};

export default DiscordAuthHandler;
