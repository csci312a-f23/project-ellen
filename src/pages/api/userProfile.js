// woooow
import { createRouter } from "next-connect";
import User from "../../../models/User";

const router = createRouter();

router
  .get(async (req, res) => {
    const { id } = req.query;
    if (!id) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const userProfile = await User.query().findById(id).throwIfNotFound();
    res.status(200).json(userProfile);
  })

  .put(async (req, res) => {
    const { id, ...updatedRoom } = req.body;
    // req.query.id is a string, and so needs to be converted to an integer before comparison
    if (id !== parseInt(req.query.id, 10)) {
      // Verify id in the url, e.g, /api/rooms/10, matches the id the request body
      res.status(400).end(`URL and object does not match`);
      return;
    }

    const room = await User.query()
      .updateAndFetchById(req.query.id, updatedRoom)
      .throwIfNotFound();
    res.status(200).json(room);
  });

export default router.handler();
