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
    const reviewData = req.body;

    try {
      const maxIdReview = await Review.query().max("id as maxId").first();

      const newReviewId = (maxIdReview.maxId || 0) + 1;

      reviewData.id = newReviewId;

      const review = await Review.query()
        .insertAndFetch(reviewData)
        .throwIfNotFound();

      res.status(200).json(review);
    } catch (error) {
      console.error("Error inserting review:", error);
      res.status(400).end(`Error with review`);
    }
  });

export default router.handler();
