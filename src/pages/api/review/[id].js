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
  })

  .put(async (req, res) => {
    const { id, dormReview, dormRating } = {
      id: req.body.reviewId,
      dormReview: req.body.dormReview,
      dormRating: Number(req.body.dormRating),
    };

    try {
      const review = await Reviews.query()
        .updateAndFetchById(id, { dormReview, dormRating })
        .throwIfNotFound();
      res.status(200).json(review);
    } catch (error) {
      res.status(400).end(`Error with review`);
    }
  })

  .delete(async (req, res) => {
    try {
      const review = await Reviews.query()
        .where("id", req.body.id)
        .del()
        .throwIfNotFound();
      res.status(200).json(review);
    } catch (error) {
      res.status(400).end(`Error with deleting review`);
    }
  });

export default router.handler();
