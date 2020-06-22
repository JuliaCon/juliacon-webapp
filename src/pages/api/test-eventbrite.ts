import { NextApiHandler } from "next";
import { getEventbriteOrder } from "../../server/eventbrite";

const TestEventbriteHandler: NextApiHandler = async (req, res) => {
  // The data returned by Eventbrite is PII, so don't allow access to this
  // endpoint except in development for testing purposes.
  if (!__DEV__) {
    res.status(403);
    return res.end();
  }

  const { orderId } = req.query;
  if (typeof orderId !== "string") {
    res.status(400);
    res.json({
      error: "Bad Request",
      description: "Invalid or unspecified orderId query parameter",
    });
    return res.end();
  }

  const order = await getEventbriteOrder({ orderId });
  if (!order) {
    res.status(404);
  }

  res.json({ order });
  return res.end();
};

export default TestEventbriteHandler;
