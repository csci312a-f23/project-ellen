// woooow
import { createRouter } from "next-connect";
import { authenticated } from "../../lib/middleware";
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

  .put(authenticated, async (req, res) => {
    const { id, id2, roomData } = {
      id: req.user.googleId,
      id2: req.user.id,
      ...req.body,
    };
    if (!id) {
      res.status(401).json({ error: "Unauthorized" });
    }

    const existingData = await User.query().findById(id2);
    res.status(200).json(existingData);

    // If room1 is empty
    if (!existingData.room1) {
      await User.query().updateAndFetchById(id2, {
        googleId: String(id),
        room1: roomData,
      });
    } else if (!existingData.room2) {
      // Else if room2 is empty
      await User.query().updateAndFetchById(id2, {
        googleId: String(id),
        room2: roomData,
      });
    } else if (!existingData.room3) {
      // Else if room3 is empty
      await User.query().updateAndFetchById(id2, {
        googleId: String(id),
        room3: roomData,
      });
    } else {
      res.status(400).end(`All rooms are occupied`);
    }
  });

export default router.handler();
