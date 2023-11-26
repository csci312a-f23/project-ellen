// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter } from "next-connect";
import Room from "../../../../models/Room";

const router = createRouter();

router.post(async (req, res) => {
  // const { roomData } = req.body;
  const { roomData } = req.body;
  const room = await Room.query().insertAndFetch(roomData).throwIfNotFound();
  res.status(200).json(room);
});

// // Notice the `onError` middleware for aspect-oriented error handler. That middleware
// // will be invoked if the handler code throws an exception.
// export default router.handler();
