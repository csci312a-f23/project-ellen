import { Model } from "objection";
import BaseModel from "./BaseModels";

import Reviews from "./Reviews";

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
        type: { type: "string" },
        beds: { type: "integer" },
        dimensions: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Reviews,
        join: {
          from: "Room.id",
          to: "Reviews.roomId",
        },
      },
    };
  }
}
