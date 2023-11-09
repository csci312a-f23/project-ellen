/* eslint-disable camelcase */
import { Model } from "objection";
import BaseModel from "./BaseModels";
import Review from "./Review";

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
        dimensions: { type: "integer" },
        type: { type: "string" },
        reviews: {
          type: "array",
          items: {
            type: "object",
            properties: {
              review: { type: "string" },
              rating: { type: "integer" },
            },
          },
          beds: { type: "integer" },
        },
      },
    };
  }

  static get relationMappings() {
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "Room.id",
          to: "Review.roomId",
        },
      },
    };
  }
}
