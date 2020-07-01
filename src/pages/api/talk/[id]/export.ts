import { NextApiHandler } from "next";

/**
 * An API route to export a talk as a `.ics` file.
 */
const talkExportHandler: NextApiHandler = async (req, res) => {
  res.status(404);
  res.write("Not implemented");
  res.end();
};

export default talkExportHandler;
