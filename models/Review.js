// /* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModels";

export default class Review extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Review";
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        review: { type: "text" },
        rating: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      room: {
        relation: Model.BelongsToOneRelation,
        modelClass: `models/Room`,
        join: {
          from: "Review.roomId",
          to: "Room.id",
        },
      },
    };
  }
}
