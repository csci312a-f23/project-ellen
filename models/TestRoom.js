import { Model } from "objection";
import BaseModel from "./BaseModels";
import Reviews from "./Reviews";

export default class Room extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "TestRooms";
  }

  // Objection.js assumes the primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id"],

      properties: {
        id: { type: "integer" },
        dorm: { type: "string" },
        dormReview: { type: "string" },
        dormRating: { type: "integer" },
        beds: { type: "integer" },
        dormDimensions: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Reviews,
        join: {
          from: "TestRoom.id",
          to: "Reviews.roomId",
        },
      },
    };
  }
}
