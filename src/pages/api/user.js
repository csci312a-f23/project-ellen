import { createRouter } from "next-connect";
import User from "../../../models/Review";

const router = createRouter();

router.get(async (req, res) => {
  const user = await User.query().findById(req.query.id).throwIfNotFound();

  res.status(200).json(user);
});

export default router.handler();
