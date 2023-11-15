import { Model } from "objection";
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

  static relationMappings = {
    related: {
      relation: Model.HasManyRelation,
      modelClass: Room, // eslint-disable-line no-use-before-define
      join: {
        from: "Article.id",
        through: {
          // RelatedArticle is the join table. These names must match the schema
          from: "RelatedReview.roomId",
          to: "RelatedReview.reviewsId",
        },
        to: "Room.id",
      },
    },
  };
}
