// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter } from "next-connect";
import TestRoom from "../../../../models/TestRoom";

const router = createRouter();

router
  .get(async (req, res) => {
    try {
      const rooms = await TestRoom.query();
      res.status(200).json(rooms);
    } catch (error) {
      console.error(error);
      res.status(400).end(`Failed to get rooms`);
    }
  })
  .post(async (req, res) => {
    try {
      const room = await TestRoom.query().insertAndFetch(req.body);
      console.log("got room");
      res.status(200).json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

export default router.handler();
// // Notice the `onError` middleware for aspect-oriented error handler. That middleware
// // will be invoked if the handler code throws an exception.
// export default router.handler();
