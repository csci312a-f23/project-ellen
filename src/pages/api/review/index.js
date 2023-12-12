import { createRouter } from "next-connect";
import Reviews from "../../../../models/Reviews";

const router = createRouter();

router
  .get(async (req, res) => {
    let query = Reviews.query();
    if (req.query) {
      query = query
        .select("*")
        .from("Reviews")
        .where("userId", req.query.userId)
        .throwIfNotFound();
    }
    const review = await query;
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

  .delete(async (req, res) => {
    try {
      let query = Reviews.query();
      if (req.query) {
        query = query.select("*").where("id", req.query.id).del();
      }
      await query;
    } catch (error) {
      res.status(400).end(`Error with deleting review`);
    }
  });

export default router.handler();
