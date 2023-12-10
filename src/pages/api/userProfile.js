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
    const { id } = req.query;
    if (!id) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const { roomData } = req.body;

    const existingData = await User.query().findById(id);
    res.status(200).json(existingData);

    if (!existingData.room1) {
      await User.query().updateAndFetchById(id, { room1: roomData });
    } else if (!existingData.room2) {
      // Check if room2 is empty
      await User.query().updateAndFetchById(id, { room2: roomData });
    } else if (!existingData.room3) {
      // Check if room3 is empty
      await User.query().updateAndFetchById(id, { room3: roomData });
    } else {
      res.status(400).end(`All rooms are occupied`);
    }
  });

export default router.handler();
