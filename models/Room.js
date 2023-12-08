import BaseModel from "./BaseModels";

export default class Room extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Room";
  }

  // Objection.js assumes the primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "integer" },
        dormRating: { type: "string" },
        dormReview: { type: "string" },
        dormDimensions: { type: "integer" },
      },
    };
  }
}
