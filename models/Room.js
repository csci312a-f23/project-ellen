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
        modelClass: Review,
        join: {
          from: "Room.id",
          to: "Review.roomId",
        },
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
