import { NextApiHandler } from "next";
import { fetchTalks } from "../../../pretalx";

export const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;

  if (!id) {
    console.log("No id provided");
    res.status(400);
    res.json(null);
    return;
  }

  const talks = await fetchTalks();
  const talk = talks.find((t) => t.id === id);

  if (!talk) {
    console.log("Didn't find talk");
    res.status(404);
    res.json(null);
    return;
  }

  res.json(talk);
};

export default handler;
