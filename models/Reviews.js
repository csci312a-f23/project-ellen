import BaseModel from "./BaseModels";

export default class Reviews extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Reviews";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        userId: { type: "string" },
        roomId: { type: "string" },
        dormReview: { type: "string" },
        dormRating: { type: "string" },
      },
    };
  }
}
