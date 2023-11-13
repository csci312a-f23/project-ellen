import { createRouter } from "next-connect";
import Room from "../../../../models/Room";

const router = createRouter();

router
  .get(async (req, res) => {
    const article = await Room.query().findById(req.query.id).throwIfNotFound();
    res.status(200).json(article);
  })

  .put(async (req, res) => {
    const { id, ...updatedRoom } = req.body;
    // req.query.id is a string, and so needs to be converted to an integer before comparison
    if (id !== parseInt(req.query.id, 10)) {
      // Verify id in the url, e.g, /api/rooms/10, matches the id the request body
      res.status(400).end(`URL and object does not match`);
      return;
    }

    const room = await Room.query()
      .updateAndFetchById(req.query.id, updatedRoom)
      .throwIfNotFound();
    res.status(200).json(room);
  });

export default router.handler();
