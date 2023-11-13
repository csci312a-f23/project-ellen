import BaseModel from "./BaseModels";

export default class Room extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Room";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id"],

      properties: {
        id: { type: "integer" },
        dormDimensions: { type: "integer" },
        dormName: { type: "string" },
        dormReview: { type: "string" },
        dormRating: { type: "string" },
      },
    };
  }
}
