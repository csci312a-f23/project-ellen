// /* eslint-disable camelcase */

// import BaseModel from "./BaseModels";

// export default class Review extends BaseModel {
//   // Table name is the only required property.
//   static get tableName() {
//     return "Review";
//   }

//   // Objection.js assumes primary key is `id` by default

//   static get jsonSchema() {
//     return {
//       type: "object",
//       required: ["id"],

//       properties: {
//         id: { type: "integer" },
//         rating: { type: "integer" },
//         comment: { type: "string" },
//         posted: { type: "integer" },
//       },
//     };
//   }
// }
