import BaseModel from "./BaseModels";

export default class User extends BaseModel {
  static get tableName() {
    return "User";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["googleId"],

      properties: {
        id: { type: "integer" },
        googleId: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        room1: { type: "string" },
        room2: { type: "string" },
        room3: { type: "string" },
      },
    };
  }

  // Override this method to exclude googleId
  $formatJson(json) {
    const formattedJson = super.$formatJson(json);
    delete formattedJson.googleId;
    return formattedJson;
  }
}
