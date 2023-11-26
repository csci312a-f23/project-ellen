// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter } from "next-connect";
import { authenticated } from "../../../lib/middleware";
import Room from "../../../../models/Room";

const router = createRouter();

router
  .get(async (req, res) => {
    let query = await Room.query();
    if (req.query.section) {
      query = query.whereRaw("UPPER(SUBSTRING(title, 1, 1)) = ?", [
        req.query.section,
      ]);
    }
    const articles = await query;
    res.status(200).json(articles);
  })

  .post(authenticated, async (req, res) => {
    const { id, ...roomData } = req.body;
    const room = await Room.query().insertAndFetch(roomData).throwIfNotFound();
    res.status(200).json(room);
  });

// Notice the `onError` middleware for aspect-oriented error handler. That middleware
// will be invoked if the handler code throws an exception.
export default router.handler();
