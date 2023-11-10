// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { createRouter } from "next-connect";
import Room from "../../../../models/Room";

const router = createRouter();

router.get(async (req, res) => {
  const { id } = req.query;

  const room = await Room.query().findById(id).throwIfNotFound();

  res.status(200).json(room);
});

export default router.handler();
// router
//   .get(async (req, res) => {
//     const room = await Room.query().findById(req.query.id).throwIfNotFound();
//     console.log(room);
//     res.status(200).json(room);
//   })
//   .put(async (req, res) => {
//     const { id, ...updatedRoom } = req.body;
//     // req.query.id is a string, and so needs to be converted to an integer before comparison
//     if (id !== parseInt(req.query.id, 10)) {
//       // Verify id in the url, e.g, /api/rooms/10, matches the id the request body
//       res.status(400).end(`URL and object does not match`);
//       return;
//     }

//     const room = await Room.query()
//       .updateAndFetchById(req.query.id, updatedRoom)
//       .throwIfNotFound();
//     res.status(200).json(room);
//   });
