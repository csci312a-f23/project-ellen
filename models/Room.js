/* eslint-disable camelcase */
// eslint-disable-next-line import/no-unresolved, no-unused-vars
import { Model } from "objection";
// eslint-disable-next-line import/no-unresolved, import/extensions
import BaseModel from "./BaseModel";

export default class Article extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "Article";
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
