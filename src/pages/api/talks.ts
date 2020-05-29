import { NextApiHandler } from "next";
import { fetchTalks, sortTalksByTime } from "../../pretalx";

const handler: NextApiHandler = async (req, res) => {
  let talks = sortTalksByTime(await fetchTalks());
  res.json(talks);
};

export default handler;
