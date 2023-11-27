import { createRouter } from "next-connect";
import Review from "../../../models/Review";

const router = createRouter();

router
  .get(async (req, res) => {
    const review = await Review.query()
      .findById(req.query.id)
      .throwIfNotFound();
    res.status(200).json(review);
  })
  .post(async (req, res) => {
    const { reviewData } = req.body;
    const review = await Review.query()
      .insertAndFetch(reviewData)
      .throwIfNotFound();
    res.status(200).json(review);
  });

export default router.handler();
