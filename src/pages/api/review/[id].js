import { createRouter } from "next-connect";
import Reviews from "../../../../models/Reviews";

const router = createRouter();

router
  .get(async (req, res) => {
    const review = await Reviews.query()
      .findById(req.query.id)
      .throwIfNotFound();
    res.status(200).json(review);
  })
  .post(async (req, res) => {
    const reviewData = req.body;
    try {
      const review = await Reviews.query()
        .insertAndFetch(reviewData)
        .throwIfNotFound();
      res.status(200).json(review);
    } catch (error) {
      res.status(400).end(`Error with review`);
    }
  });

export default router.handler();
